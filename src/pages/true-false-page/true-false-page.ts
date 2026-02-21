import styles from './true-false-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

export class TrueFalsePage implements IPage {
  public render(): Component {
    const trueFalse: Component = new Component({ className: [styles.trueFalse, 'pageContainer'] });
    return trueFalse;
  }
  public destroy(): void {}
}
