import styles from './output-predictor-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { layout } from '@/components/layout/layout';

export class OutputPredictorPage implements IPage {
  public destroy: () => void;

  constructor() {
    this.destroy = (): void => {
      layout.clearRoot();
    };
  }

  public render(): void {
    const outputPredictor: Component = new Component({ className: styles.outputPredictor });
    layout.root.append(outputPredictor);
  }
}
