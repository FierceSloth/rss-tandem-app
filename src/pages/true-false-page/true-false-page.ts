import styles from './true-false-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { layout } from '@/components/layout/layout';

export class TrueFalsePage implements IPage {
  public destroy: () => void;

  constructor() {
    this.destroy = (): void => {
      layout.clearRoot();
    };
  }

  public render(): void {
    const trueFalse: Component = new Component({ className: styles.trueFalse });
    layout.root.append(trueFalse);
  }
}
