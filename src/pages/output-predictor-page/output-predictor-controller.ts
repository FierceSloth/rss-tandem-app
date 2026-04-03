import type { IOutputPredictor } from './common/types/types';
import { useNavigate } from '@/router/hooks';
import { useParams } from '@/router/hooks';
import { outputPredictorEmitter } from './common/utils/output-predictor-emitter.utils';
import { OutputPredictorEvents, OutputPredictorViewState } from './common/enum/enum';
import { DELAY } from '@/common/constants/constants';
import { outputPredictorStore } from './store/output-predictor.store';
import type { OutputPredictorPage } from './output-predictor-page';
import { Toast } from '@/components/ui/toast/toast.view';
import { ROUTES } from '@/router/constants';
import { OutputPredictorRepository } from './repositories/output-predictor.repositories';

const DURATION = 3000;

export class OutputPredictorPageController {
  private readonly levelId: string = useParams()['id'];
  private readonly view: OutputPredictorPage;
  private readonly repository: OutputPredictorRepository;
  private readonly navigate: ReturnType<typeof useNavigate>;

  constructor(view: OutputPredictorPage) {
    this.view = view;
    this.navigate = useNavigate();
    this.repository = new OutputPredictorRepository();

    outputPredictorEmitter.on(OutputPredictorEvents.NEXT, this.nextTask);
    outputPredictorEmitter.on(OutputPredictorEvents.OPTION_SELECTED, this.handleAnswer);
    outputPredictorEmitter.on(OutputPredictorEvents.SKIP, this.skipTask);

    this.view.getMain().getSkipButton().node.addEventListener('click', this.onSkipClick);
    document.addEventListener('keydown', this.onKeyDown);

    void this.init();
  }

  public destroy(): void {
    outputPredictorEmitter.off(OutputPredictorEvents.NEXT, this.nextTask);
    outputPredictorEmitter.off(OutputPredictorEvents.OPTION_SELECTED, this.handleAnswer);
    outputPredictorEmitter.off(OutputPredictorEvents.SKIP, this.skipTask);

    document.removeEventListener('keydown', this.onKeyDown);
  }

  public nextTask = (): void => {
    const state = outputPredictorStore.getState();

    if (state.currentIndex >= state.tasks.length - 1) {
      outputPredictorStore.setState({ status: OutputPredictorViewState.FINISHED });
      return;
    }

    outputPredictorStore.setState({
      currentIndex: state.currentIndex + 1,
      selectedKey: null,
      isAnswered: false,
    });
  };

  public skipTask = (): void => {
    const state = outputPredictorStore.getState();
    if (state.isAnswered) return;

    const correctOption = state.tasks[state.currentIndex].options.find((option) => option.is_correct);
    const correctKey = correctOption?.key ?? '';

    this.view.getMain().outputOptions.checkAnswers('', correctKey);
    outputPredictorStore.setState({ isAnswered: true });

    setTimeout(() => {
      if (outputPredictorStore.getState().status === OutputPredictorViewState.PLAYING) {
        this.nextTask();
      }
    }, DELAY);
  };

  private onSkipClick = (): void => {
    outputPredictorEmitter.emit(OutputPredictorEvents.SKIP, null);
  };

  private onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      outputPredictorEmitter.emit(OutputPredictorEvents.SKIP, null);
    }
  };

  private async init(): Promise<void> {
    outputPredictorStore.setState({ status: OutputPredictorViewState.LOADING });

    try {
      const tasks: IOutputPredictor[] = await this.repository.fetchQuestions(this.levelId);

      if (!tasks || tasks.length === 0) {
        outputPredictorStore.setState({ status: OutputPredictorViewState.ERROR });
        this.navigate(ROUTES.NOT_FOUND_PAGE);
        return;
      }

      outputPredictorStore.setState({
        tasks,
        status: OutputPredictorViewState.PLAYING,
        currentIndex: 0,
        selectedKey: null,
        isAnswered: false,
        correctAnswers: 0,
      });

      this.view.showContent();
    } catch (error: unknown) {
      outputPredictorStore.setState({ status: OutputPredictorViewState.ERROR });
      console.error('Failed to load tasks', error);
      new Toast({
        message: 'Failed to load tasks. Please try again.',
        type: 'error',
        duration: DURATION,
      });
    }
  }

  private handleAnswer = ({ key }: { index: number; key: string }): void => {
    const state = outputPredictorStore.getState();
    if (state.status !== OutputPredictorViewState.PLAYING) return;
    if (state.isAnswered) return;

    const currentTask = state.tasks[state.currentIndex];
    const correctOption = currentTask.options.find((option) => option.is_correct);
    const correctKey = correctOption?.key ?? '';
    const isCorrect = key === correctKey;

    outputPredictorStore.setState({
      selectedKey: key,
      isAnswered: true,
      correctAnswers: isCorrect ? state.correctAnswers + 1 : state.correctAnswers,
    });

    this.view.getMain().outputOptions.checkAnswers(key, correctKey);

    setTimeout(() => {
      if (outputPredictorStore.getState().status === OutputPredictorViewState.PLAYING) {
        this.nextTask();
      }
    }, DELAY);
  };
}
