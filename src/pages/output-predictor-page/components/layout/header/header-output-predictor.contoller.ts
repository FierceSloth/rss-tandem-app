import type { HeaderOutputPredictor } from './header-output-predictor.view';
import { outputPredictorEmitter } from '@/pages/output-predictor-page/common/utils/output-predictor-emitter.utils';
import { OutputPredictorEvents } from '@/pages/output-predictor-page/common/enum/enum';
import { outputPredictorStore } from '@/pages/output-predictor-page/store/output-predictor.store';

export class HeaderOutputPredictorController {
  private view: HeaderOutputPredictor;

  constructor(view: HeaderOutputPredictor) {
    this.view = view;
    this.initListeners();
  }

  public destroy(): void {
    outputPredictorEmitter.off(OutputPredictorEvents.LOADED, this.onLoaded);
    outputPredictorEmitter.off(OutputPredictorEvents.NEXT, this.onNext);
  }

  private initListeners(): void {
    outputPredictorEmitter.on(OutputPredictorEvents.LOADED, this.onLoaded);
    outputPredictorEmitter.on(OutputPredictorEvents.NEXT, this.onNext);
  }

  private onLoaded = (): void => {
    const { tasks, currentIndex } = outputPredictorStore.getState();
    const current = tasks[currentIndex];

    this.view.setTitle(current.title);
    this.view.setDifficulty(current.difficulty);
    this.view.setSimulation(currentIndex + 1, tasks.length);

    this.view.timer.getEngine().reset();
    this.view.timer.getEngine().start();
  };

  private onNext = (): void => {
    const { tasks, currentIndex } = outputPredictorStore.getState();
    const current = tasks[currentIndex];

    this.view.setTitle(current.title);
    this.view.setSimulation(currentIndex + 1, tasks.length);
  };
}
