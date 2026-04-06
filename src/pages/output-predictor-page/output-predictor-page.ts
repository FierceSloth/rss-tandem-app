import styles from './output-predictor-page.module.scss';
import type { IPage } from '@/common/types/types';
import type { Component } from '@/components/base/component';
import type { IOutputPredictorState } from './common/types/types';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';
import { LoaderManager } from '@/common/utils/loader-manager.util';
import { HeaderOutputPredictor } from './components/layout/header/header-output-predictor.view';
import { MainOutputPredictor } from './components/layout/main/main-output-predictor.view';
import { OutputPredictorPageController } from './output-predictor.controller';
import { outputPredictorStore } from './store/output-predictor.store';
import { outputPredictorEmitter } from './common/utils/output-predictor-emitter.utils';
import { OutputPredictorEvents, OutputPredictorViewState } from './common/enum/enum';
import { OptionCard } from './components/features/option-card/option-card.view';
import { Score } from '@/components/features/score/score.view';
import { ProgressService } from '@/service/progress/progress.service';
import { Footer } from '@/components/layout/footer/footer.view';

export class OutputPredictorPage implements IPage {
  public lastRenderedIndex = -1;

  private readonly root: PageLayout;
  private readonly header: HeaderOutputPredictor;
  private readonly footer: Footer;
  private readonly main: MainOutputPredictor;
  private readonly loader: LoaderManager;
  private unsubscribe?: () => void;
  private controller: OutputPredictorPageController | null = null;
  private resultView?: Score;

  constructor() {
    this.header = new HeaderOutputPredictor({});
    this.footer = new Footer({});
    this.root = new PageLayout({
      className: styles.outputPredictor,
      withSidebar: false,
      header: this.header,
      footer: this.footer,
    });
    this.main = new MainOutputPredictor({});
    this.loader = new LoaderManager();

    this.unsubscribe = outputPredictorStore.subscribe((state) => {
      this.renderState(state);
    });
  }

  public render(): Component {
    this.controller = new OutputPredictorPageController(this);
    return this.root;
  }

  public destroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (this.controller) {
      this.controller.destroy();
    }
  }

  public getHeader(): HeaderOutputPredictor {
    return this.header;
  }

  public getMain(): MainOutputPredictor {
    return this.main;
  }

  public showContent(): void {
    this.root.append(this.main);
  }

  private renderState(state: IOutputPredictorState): void {
    switch (state.status) {
      case OutputPredictorViewState.LOADING: {
        this.showLoading();
        break;
      }
      case OutputPredictorViewState.ERROR: {
        this.hideLoading();
        break;
      }
      case OutputPredictorViewState.PLAYING: {
        this.hideLoading();
        if (state.currentIndex !== this.lastRenderedIndex) {
          const currentTask = state.tasks[state.currentIndex];
          this.main.setCode(currentTask.code);
          this.main.setMeta(currentTask.tag);

          const optionCards = currentTask.options.map(
            (option, index) => new OptionCard({ optionKey: option.key, lines: option.lines, index })
          );
          this.main.outputOptions.setOptions(optionCards);

          this.lastRenderedIndex = state.currentIndex;
          outputPredictorEmitter.emit(OutputPredictorEvents.LOADED, null);
        }
        break;
      }
      case OutputPredictorViewState.FINISHED: {
        this.hideLoading();
        if (!this.resultView) {
          this.showResult(state);
        }
        break;
      }
    }
  }

  private showLoading(): void {
    this.loader.show('lg', 'green');
  }

  private hideLoading(): void {
    this.loader.hide();
  }

  private showResult(state: IOutputPredictorState): void {
    this.main.node.style.display = 'none';
    this.header.node.style.display = 'none';
    this.footer.node.style.display = 'none';

    this.resultView = new Score({
      scoreData: {
        correct: state.correctAnswers,
        total: state.tasks.length,
      },
      withButtons: true,
    });

    void ProgressService.saveLevelProgress(String(this.controller?.levelId), state.correctAnswers, state.tasks.length);

    this.root.append(this.resultView);
  }
}
