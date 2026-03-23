import styles from './quiz-page.module.scss';
import type { IPage } from '@/common/types/types';
import type { Component } from '@/components/base/component';
import type { IQuizState } from './common/types/types';
import { Card } from '@/components/layout/card/card.view';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';
import { LoaderManager } from '@/common/utils/loader-manager.util';
import { QuizFooter } from './components/layout/quiz-footer/quiz-footer.view';
import { QuizHeader } from './components/layout/quiz-header/quiz-header.view';
import { QuizContainer } from './components/layout/quiz-container/quiz-container.view';
import { QuizPageController } from './quiz-page.controller';
import { QuizEvents, QuizViewState } from './common/enums/enums';
import { quizEmitter } from './common/utils/quiz-emmiter.util';
import { quizStore } from './store/quiz.store';
import { Score } from '@/components/features/score/score.view';

export class QuizPage implements IPage {
  public lastRenderedIndex = -1;
  private readonly card: Card;
  private quizHeader: QuizHeader;
  private quizFooter: QuizFooter;
  private quizContainer: QuizContainer;
  private loader: LoaderManager;
  private unsubscribe?: () => void;
  private resultView?: Score;
  private controller: QuizPageController | null;
  private root: PageLayout;

  constructor() {
    this.quizHeader = new QuizHeader({});
    this.quizFooter = new QuizFooter({});
    this.quizContainer = new QuizContainer({});
    this.card = new Card({ tag: 'section', className: styles.card, padding: 'none' });
    this.loader = new LoaderManager();
    this.unsubscribe = quizStore.subscribe((state) => {
      this.renderState(state);
    });
    this.root = new PageLayout({ className: styles.quiz, withSidebar: false });

    this.controller = null;
  }

  public render(): Component {
    this.controller = new QuizPageController(this);
    return this.root;
  }

  public destroy(): void {
    this.unsubscribe?.();
    this.controller?.destroy();
  }

  public getFooter(): QuizFooter {
    return this.quizFooter;
  }

  public getQuizContainer(): QuizContainer {
    return this.quizContainer;
  }

  public getHeader(): QuizHeader {
    return this.quizHeader;
  }

  public showContent(): void {
    this.card.append(this.quizHeader, this.quizContainer, this.quizFooter);
    this.root.append(this.card);
  }

  private showResult(result: IQuizState): void {
    this.quizContainer.addHidden();

    this.resultView = new Score({ scoreData: { correct: result.correctAnswers, total: result.tasks.length } });
    this.quizHeader.node.after(this.resultView.node);
  }

  private renderState(quizState: IQuizState): void {
    switch (quizState.status) {
      case QuizViewState.LOADING: {
        this.showLoading();
        break;
      }
      case QuizViewState.ERROR: {
        this.hideLoading();
        break;
      }
      case QuizViewState.QUIZ: {
        this.hideLoading();
        this.hideResult();
        if (quizState.currentIndex !== this.lastRenderedIndex) {
          this.quizContainer.setTask(quizState.tasks[quizState.currentIndex]);
          this.lastRenderedIndex = quizState.currentIndex;
          quizEmitter.emit(QuizEvents.PROGRESS, null);
        }
        break;
      }
      case QuizViewState.RESULT: {
        this.hideLoading();
        if (!this.resultView) {
          this.showResult(quizState);
          quizEmitter.emit(QuizEvents.RESULT, null);
        }
        break;
      }
    }
  }

  private hideResult(): void {
    this.resultView?.destroy();
    this.resultView = undefined;

    this.quizContainer.removeHidden();
  }

  private showLoading(): void {
    this.loader.show('lg', 'green');
  }

  private hideLoading(): void {
    this.loader.hide();
  }
}
