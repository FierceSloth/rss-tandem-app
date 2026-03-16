import { quizEmitter } from '@/pages/quiz-page/common/utils/quiz-emmiter.util';
import { QuizEvents, QuizViewState } from '@/pages/quiz-page/common/enums/enums';
import type { QuizHeader } from './quiz-header.view';
import { quizStore } from '@/pages/quiz-page/store/quiz.store';

export class QuizHeaderController {
  private view: QuizHeader;

  constructor(view: QuizHeader) {
    this.view = view;
    this.view.timer.getEngine().onEnd(() => {
      quizStore.setState({
        status: QuizViewState.RESULT,
      });
      quizEmitter.emit(QuizEvents.RESULT, null);
    });

    this.initListeners();
  }

  private initListeners(): void {
    quizEmitter.on(QuizEvents.PROGRESS, this.onProgress);
    quizEmitter.on(QuizEvents.RETRY, this.onQuizRetry);
    quizEmitter.on(QuizEvents.RESULT, this.onQuizFinished);
  }

  private onProgress = (): void => {
    const state = quizStore.getState();

    this.view.setLevel(state.currentIndex + 1, state.tasks.length);
    this.view.setProgress(state.currentIndex + 1, state.tasks.length);
  };

  private onQuizFinished = (): void => {
    this.view.timer.getEngine().stop();
  };

  private onQuizRetry = (): void => {
    this.view.timer.getEngine().reset();
    this.view.timer.getEngine().start();
  };
}
