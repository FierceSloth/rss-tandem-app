import type { IQuizMetadata } from '@/common/types/types';
import { useParams } from '@/router/hooks';
import { quizEmitter } from './common/utils/quiz-emmiter.util';
import { QuizEvents, QuizViewState } from './common/enums/enums';
import { DELAY } from '@/common/constants/constants';
import { QuizRepository } from './repository/quiz.repository';
import { quizStore } from './store/quiz.store';
import type { QuizPage } from './quiz-page';

export class QuizPageController {
  private id: string = useParams()['id'];
  private view: QuizPage;
  private quizRepository: QuizRepository;

  constructor(view: QuizPage) {
    this.view = view;
    this.quizRepository = new QuizRepository();

    quizEmitter.on(QuizEvents.NEXT, () => this.nextTask());
    quizEmitter.on(QuizEvents.SKIP, () => this.skipTask());
    quizEmitter.on(QuizEvents.ANSWER, (quizMetadata: IQuizMetadata) => this.handleAnswer(quizMetadata));
    quizEmitter.on(QuizEvents.RETRY, () => this.resetQuiz());

    void this.init();
  }

  public nextTask(): void {
    const state = quizStore.getState();

    if (state.currentIndex + 1 >= state.tasks.length) {
      quizStore.setState({
        status: QuizViewState.RESULT,
      });
      return;
    }

    quizStore.setState({
      currentIndex: state.currentIndex + 1,
      currentIndexAnswered: false,
    });
  }

  public skipTask(): void {
    this.nextTask();
  }

  public resetQuiz(): void {
    const state = quizStore.getState();
    this.view.lastRenderedIndex = -1;
    quizStore.setState({
      currentIndex: 0,
      correctAnswers: 0,
      status: QuizViewState.QUIZ,
      tasks: state.tasks,
      currentIndexAnswered: false,
    });
  }

  private async init(): Promise<void> {
    quizStore.setState({ status: QuizViewState.LOADING });

    const tasks = await this.quizRepository.fetchQuestions(this.id);
    quizStore.setState({
      tasks,
      status: QuizViewState.QUIZ,
      currentIndex: 0,
      correctAnswers: 0,
    });
  }

  private handleAnswer({ index, isCorrect }: IQuizMetadata): void {
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
      this.nextTask();
    }, DELAY);
  }
}
