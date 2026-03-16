import { quizEmitter } from '@/pages/quiz-page/common/utils/quiz-emmiter.util';
import type { QuizFooter } from './quiz-footer.view';
import { QuizEvents } from '@/pages/quiz-page/common/enums/enums';
import { messages } from '@/pages/quiz-page/common/constants/messages';
import { ROUTES } from '@/router/constants';
import { useNavigate } from '@/router/hooks';

export class QuizFooterController {
  private view: QuizFooter;
  private navigate: ReturnType<typeof useNavigate>;

  constructor(view: QuizFooter) {
    this.view = view;
    this.navigate = useNavigate();

    this.setDefaultButtons();

    quizEmitter.on(QuizEvents.RETRY, () => this.setDefaultButtons());
    quizEmitter.on(QuizEvents.RESULT, () => this.setResultFooterButtons());
  }

  private setDefaultButtons = (): void => {
    this.view.ghostButton.removeListener('click', this.onRetry);
    this.view.primaryButton.removeListener('click', this.onBackToRoadmap);

    this.view.ghostButton.setText(messages.buttons.skipButton);
    this.view.primaryButton.setText(messages.buttons.continueButton);

    this.view.primaryButton.addListener('click', this.onContinue);
    this.view.ghostButton.addListener('click', this.onSkip);
  };

  private setResultFooterButtons = (): void => {
    this.view.ghostButton.removeListener('click', this.onSkip);
    this.view.primaryButton.removeListener('click', this.onContinue);

    this.view.ghostButton.setText(messages.buttons.tryAgainButton);
    this.view.primaryButton.setText(messages.buttons.backToRoadmapButton);

    this.view.ghostButton.addListener('click', this.onRetry);
    this.view.primaryButton.addListener('click', this.onBackToRoadmap);
  };

  private onContinue = (): void => {
    quizEmitter.emit(QuizEvents.NEXT, null);
  };

  private onSkip = (): void => {
    quizEmitter.emit(QuizEvents.SKIP, null);
  };

  private onRetry = (): void => {
    quizEmitter.emit(QuizEvents.RETRY, null);
  };

  private onBackToRoadmap = (): void => {
    this.navigate(ROUTES.LEVEL_SELECTION_PAGE);
  };
}
