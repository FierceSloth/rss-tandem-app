import { trueFalseEmitter } from '@/pages/true-false-page/common/utils/true-false-emmiter.util';
import { TrueFalseEvents, TrueFalseViewState } from '@/pages/true-false-page/common/enums/enums';
import type { TrueFalseHeader } from './true-false-header.view';
import { trueFalseStore } from '@/pages/true-false-page/store/true-false.store';

export class TrueFalseHeaderController {
  private view: TrueFalseHeader;

  constructor(view: TrueFalseHeader) {
    this.view = view;
    this.view.timer.getEngine().onEnd(() => {
      if (trueFalseStore.getState().status === TrueFalseViewState.ERROR) {
        return;
      }
      trueFalseStore.setState({
        status: TrueFalseViewState.RESULT,
      });
      trueFalseEmitter.emit(TrueFalseEvents.RESULT, null);
    });

    this.initListeners();
  }

  public destroy(): void {
    trueFalseEmitter.off(TrueFalseEvents.PROGRESS, this.onProgress);
    trueFalseEmitter.off(TrueFalseEvents.RETRY, this.onTrueFalseRetry);
    trueFalseEmitter.off(TrueFalseEvents.RESULT, this.onTrueFalseFinished);
  }

  private initListeners(): void {
    trueFalseEmitter.on(TrueFalseEvents.PROGRESS, this.onProgress);
    trueFalseEmitter.on(TrueFalseEvents.RETRY, this.onTrueFalseRetry);
    trueFalseEmitter.on(TrueFalseEvents.RESULT, this.onTrueFalseFinished);
  }

  private onProgress = (): void => {
    const state = trueFalseStore.getState();

    this.view.setLevel(state.currentIndex + 1, state.tasks.length);
    this.view.setProgress(state.currentIndex + 1, state.tasks.length);
  };

  private onTrueFalseFinished = (): void => {
    this.view.timer.getEngine().stop();
  };

  private onTrueFalseRetry = (): void => {
    this.view.timer.getEngine().reset();
    this.view.timer.getEngine().start();
  };
}
