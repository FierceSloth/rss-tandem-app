import type { IQuiz, IQuizMetadata, IQuizOption } from '@/pages/quiz-page/common/types/types';
import { useNavigate } from '@/router/hooks';
import { useParams } from '@/router/hooks';
import { quizEmitter } from './common/utils/quiz-emmiter.util';
import { QuizEvents, QuizViewState } from './common/enums/enums';
import { DELAY } from '@/common/constants/constants';
import { quizStore } from './store/quiz.store';
import type { QuizPage } from './quiz-page';
import { Toast } from '@/components/ui/toast/toast.view';
import { messages } from './common/constants/messages';
import { messages as commonMessages } from '@/common/constants/messages';
import { QUIZ_LOADING_ERROR_DURATION } from './common/constants/constants';
import { shuffle } from '@/common/utils/shuffle.util';
import { ROUTES } from '@/router/constants';
import { UserService } from '@/service/user-service/user.service';
import type { IUserDetails } from '@/service/user-service/types/types';
import { LevelStatus } from '@/common/enums/enums';
import { getStars } from '@/components/features/score/common/utils/score.util';
import { QuizRepository } from './repositories/quiz.repository';
import { userLevelProgressRepository } from '@/common/repositories/user-level-progress.repository';

export class QuizPageController {
  private levelId: string = useParams()['id'];
  private view: QuizPage;
  private quizRepository: QuizRepository;
  private navigate: ReturnType<typeof useNavigate>;

  constructor(view: QuizPage) {
    this.view = view;
    this.navigate = useNavigate();
    this.quizRepository = new QuizRepository();

    quizEmitter.on(QuizEvents.NEXT, this.nextTask);
    quizEmitter.on(QuizEvents.SKIP, this.skipTask);
    quizEmitter.on(QuizEvents.ANSWER, this.handleAnswer);
    quizEmitter.on(QuizEvents.RETRY, this.resetQuiz);
    quizEmitter.on(QuizEvents.RESULT, this.onResult);

    void this.init();
  }

  public destroy(): void {
    quizEmitter.off(QuizEvents.NEXT, this.nextTask);
    quizEmitter.off(QuizEvents.SKIP, this.skipTask);
    quizEmitter.off(QuizEvents.ANSWER, this.handleAnswer);
    quizEmitter.off(QuizEvents.RETRY, this.resetQuiz);
    quizEmitter.off(QuizEvents.RESULT, this.onResult);
  }

  public nextTask = (): void => {
    const state = quizStore.getState();

    if (state.currentIndex >= state.tasks.length - 1) {
      quizStore.setState({
        status: QuizViewState.RESULT,
      });
      return;
    }

    quizStore.setState({
      currentIndex: state.currentIndex + 1,
      currentIndexAnswered: false,
    });
  };

  public skipTask = (): void => {
    this.nextTask();
  };

  public resetQuiz = (): void => {
    const state = quizStore.getState();
    this.view.lastRenderedIndex = -1;
    quizStore.setState({
      currentIndex: 0,
      correctAnswers: 0,
      status: QuizViewState.QUIZ,
      tasks: state.tasks,
      currentIndexAnswered: false,
    });
  };

  private async init(): Promise<void> {
    quizStore.setState({ status: QuizViewState.LOADING });

    try {
      const tasks: IQuiz[] = await this.quizRepository.fetchQuestions(this.levelId);
      if (!tasks || tasks.length === 0) {
        quizStore.setState({ status: QuizViewState.ERROR });
        this.navigate(ROUTES.NOT_FOUND_PAGE);
        return;
      }

      const shuffledTasks: IQuiz[] = shuffle(tasks).map((task) => ({
        ...task,
        options: shuffle<IQuizOption>(task.options),
      }));
      quizStore.setState({
        tasks: shuffledTasks,
        status: QuizViewState.QUIZ,
        currentIndex: 0,
        correctAnswers: 0,
      });
    } catch (error: unknown) {
      quizStore.setState({ status: QuizViewState.ERROR });
      console.error(messages.errors.failedLoadQuiz, error);
      new Toast({
        message: messages.errors.failedLoadQuizPleaseTryLater,
        type: 'error',
        duration: QUIZ_LOADING_ERROR_DURATION,
      });
    }
  }

  private handleAnswer = ({ index, isCorrect }: IQuizMetadata): void => {
    const state = quizStore.getState();
    if (state.status !== QuizViewState.QUIZ) {
      return;
    }

    if (state.currentIndexAnswered) {
      return;
    }
    quizStore.setState({ currentIndexAnswered: true });

    this.view.getQuizContainer().checkAnswers(index);

    if (isCorrect) {
      quizStore.setState({
        correctAnswers: state.correctAnswers + 1,
      });
    }

    setTimeout(() => {
      if (quizStore.getState().status === QuizViewState.QUIZ) {
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
      const state = quizStore.getState();
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
