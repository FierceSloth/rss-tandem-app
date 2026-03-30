import { useNavigate } from '@/router/hooks';
import { useParams } from '@/router/hooks';
import { DELAY, LOADING_ERROR_DURATION_60_SEC } from '@/common/constants/constants';
import { Toast } from '@/components/ui/toast/toast.view';
import { messages } from './common/constants/messages';
import { messages as commonMessages } from '@/common/constants/messages';
import { shuffle } from '@/common/utils/shuffle.util';
import { ROUTES } from '@/router/constants';
import { UserService } from '@/service/user-service/user.service';
import type { IUserDetails } from '@/service/user-service/types/types';
import { LevelStatus } from '@/common/enums/enums';
import { getStars } from '@/components/features/score/common/utils/score.util';
import { userLevelProgressRepository } from '@/common/repositories/user-level-progress.repository';
import type { TrueFalsePage } from './true-false-page';
import { TrueFalseRepository } from './repositories/true-false.repository';
import { trueFalseEmitter } from './common/utils/true-false-emmiter.util';
import { TrueFalseEvents, TrueFalseViewState } from './common/enums/enums';
import { trueFalseStore } from './store/true-false.store';
import type { ITrueFalse, ITrueFalseMetadata } from './common/types/types';

export class TrueFalsePageController {
  private levelId: string = useParams()['id'];
  private view: TrueFalsePage;
  private trueFalseRepository: TrueFalseRepository;
  private navigate: ReturnType<typeof useNavigate>;

  constructor(view: TrueFalsePage) {
    this.view = view;
    this.navigate = useNavigate();
    this.trueFalseRepository = new TrueFalseRepository();

    trueFalseEmitter.on(TrueFalseEvents.NEXT, this.nextTask);
    trueFalseEmitter.on(TrueFalseEvents.SKIP, this.skipTask);
    trueFalseEmitter.on(TrueFalseEvents.ANSWER, this.handleAnswer);
    trueFalseEmitter.on(TrueFalseEvents.RETRY, this.resetTrueFalse);
    trueFalseEmitter.on(TrueFalseEvents.RESULT, this.onResult);

    void this.init();
  }

  public destroy(): void {
    trueFalseEmitter.off(TrueFalseEvents.NEXT, this.nextTask);
    trueFalseEmitter.off(TrueFalseEvents.SKIP, this.skipTask);
    trueFalseEmitter.off(TrueFalseEvents.ANSWER, this.handleAnswer);
    trueFalseEmitter.off(TrueFalseEvents.RETRY, this.resetTrueFalse);
    trueFalseEmitter.off(TrueFalseEvents.RESULT, this.onResult);
  }

  public nextTask = (): void => {
    const state = trueFalseStore.getState();

    if (state.currentIndex >= state.tasks.length - 1) {
      trueFalseStore.setState({
        status: TrueFalseViewState.RESULT,
      });
      return;
    }

    trueFalseStore.setState({
      currentIndex: state.currentIndex + 1,
      currentIndexAnswered: false,
    });
  };

  public skipTask = (): void => {
    this.nextTask();
  };

  public resetTrueFalse = (): void => {
    const state = trueFalseStore.getState();
    this.view.lastRenderedIndex = -1;
    trueFalseStore.setState({
      currentIndex: 0,
      correctAnswers: 0,
      status: TrueFalseViewState.PROGRESS,
      tasks: state.tasks,
      currentIndexAnswered: false,
    });
  };

  private async init(): Promise<void> {
    trueFalseStore.setState({ status: TrueFalseViewState.LOADING });

    try {
      const tasks: ITrueFalse[] = await this.trueFalseRepository.fetchQuestions(this.levelId);
      if (!tasks || tasks.length === 0) {
        trueFalseStore.setState({ status: TrueFalseViewState.ERROR });
        this.navigate(ROUTES.NOT_FOUND_PAGE);
        return;
      }

      const shuffledTasks: ITrueFalse[] = shuffle(tasks);
      trueFalseStore.setState({
        tasks: shuffledTasks,
        status: TrueFalseViewState.PROGRESS,
        currentIndex: 0,
        correctAnswers: 0,
      });
    } catch (error: unknown) {
      trueFalseStore.setState({ status: TrueFalseViewState.ERROR });
      console.error(messages.errors.failedLoadTask, error);
      new Toast({
        message: messages.errors.failedLoadTaskPleaseTryLater,
        type: 'error',
        duration: LOADING_ERROR_DURATION_60_SEC,
      });
    }
  }

  private handleAnswer = ({ action }: ITrueFalseMetadata): void => {
    const state = trueFalseStore.getState();
    if (state.status !== TrueFalseViewState.PROGRESS) {
      return;
    }

    if (state.currentIndexAnswered) {
      return;
    }
    trueFalseStore.setState({ currentIndexAnswered: true });

    const match = this.view.getTrueFalseContainer().checkAnswer({ action });

    if (match) {
      trueFalseStore.setState({
        correctAnswers: state.correctAnswers + 1,
      });
    }

    setTimeout(() => {
      if (trueFalseStore.getState().status === TrueFalseViewState.PROGRESS) {
        this.nextTask();
      }
    }, DELAY);
  };

  private onResult = (): void => {
    void this.saveProgress();
  };

  private async saveProgress(): Promise<void> {
    try {
      const user: IUserDetails | null = await UserService.getUserDetails();
      if (!user) {
        console.error(messages.errors.failedSaveProgressWithLevelId(this.levelId), commonMessages.errors.userNotFound);
        new Toast({
          message: commonMessages.errors.userNotFound,
          type: 'error',
        });
        return;
      }
      const state = trueFalseStore.getState();
      const stars = getStars(state.correctAnswers, state.tasks.length);
      void userLevelProgressRepository.saveUserLevelProgress({
        user_id: user.id,
        level_id: this.levelId,
        status: LevelStatus.COMPLETED,
        stars: stars,
      });
    } catch (error: unknown) {
      console.error(messages.errors.failedSaveProgressWithLevelId(this.levelId), error);
      new Toast({
        message: messages.errors.failedSaveProgress,
        type: 'error',
      });
    }
  }
}
