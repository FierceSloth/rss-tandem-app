import styles from './true-false-page.module.scss';
import type { IPage } from '@/common/types/types';
import type { Component } from '@/components/base/component';
import { Footer } from '@/components/layout/footer/footer.view';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';
import { TrueFalsePageController } from './true-false-page.controller';
import { LoaderManager } from '@/common/utils/loader-manager.util';
import { Score } from '@/components/features/score/score.view';
import type { ITrueFalseState } from './common/types/types';
import { TrueFalseEvents, TrueFalseViewState } from './common/enums/enums';
import { trueFalseEmitter } from './common/utils/true-false-emmiter.util';
import { trueFalseStore } from './store/true-false.store';
import { TrueFalseHeader } from './components/layout/true-false-header/true-false-header.view';
import { TrueFalseContainer } from './components/layout/true-false-container/true-false-container.view';

export class TrueFalsePage implements IPage {
  public lastRenderedIndex = -1;
  private header: TrueFalseHeader;
  private trueFalseContainer: TrueFalseContainer;
  private loader: LoaderManager;
  private unsubscribe?: () => void;
  private resultView?: Score;
  private controller: TrueFalsePageController | null = null;
  private root: PageLayout;

  constructor() {
    this.header = new TrueFalseHeader({});
    this.trueFalseContainer = new TrueFalseContainer({});
    const footer: Footer = new Footer({});
    this.loader = new LoaderManager();
    this.unsubscribe = trueFalseStore.subscribe((state) => {
      this.renderState(state);
    });

    this.root = new PageLayout(
      {
        className: styles.trueFalse,
        withSidebar: false,
        header: this.header,
        footer: footer,
      },
      this.trueFalseContainer
    );
  }

  public render(): Component {
    this.controller = new TrueFalsePageController(this);
    return this.root;
  }

  public destroy(): void {
    this.unsubscribe?.();
    this.controller?.destroy();
  }

  public getTrueFalseContainer(): TrueFalseContainer {
    return this.trueFalseContainer;
  }

  public showContent(): void {
    this.root.append(this.header, this.trueFalseContainer);
  }

  private showResult(result: ITrueFalseState): void {
    this.trueFalseContainer.addHidden();

    this.resultView = new Score({ scoreData: { correct: result.correctAnswers, total: result.tasks.length } });
    this.header.node.after(this.resultView.node);
  }

  private renderState(trueFalseState: ITrueFalseState): void {
    switch (trueFalseState.status) {
      case TrueFalseViewState.LOADING: {
        this.showLoading();
        break;
      }
      case TrueFalseViewState.ERROR: {
        this.hideLoading();
        break;
      }
      case TrueFalseViewState.PROGRESS: {
        this.hideLoading();
        this.hideResult();
        if (trueFalseState.currentIndex !== this.lastRenderedIndex) {
          this.trueFalseContainer.setTask(trueFalseState.tasks[trueFalseState.currentIndex]);
          this.lastRenderedIndex = trueFalseState.currentIndex;
          trueFalseEmitter.emit(TrueFalseEvents.PROGRESS, null);
        }
        break;
      }
      case TrueFalseViewState.RESULT: {
        this.hideLoading();
        if (!this.resultView) {
          this.showResult(trueFalseState);
          trueFalseEmitter.emit(TrueFalseEvents.RESULT, null);
        }
        break;
      }
    }
  }

  private hideResult(): void {
    this.resultView?.destroy();
    this.resultView = undefined;

    this.trueFalseContainer.removeHidden();
  }

  private showLoading(): void {
    this.loader.show('lg', 'green');
  }

  private hideLoading(): void {
    this.loader.hide();
  }
}
