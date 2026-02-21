import styles from './output-predictor-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

export class OutputPredictorPage implements IPage {
  public render(): Component {
    const outputPredictor: Component = new Component({ className: [styles.outputPredictor, 'pageContainer'] });
    return outputPredictor;
  }

  public destroy(): void {}
}
