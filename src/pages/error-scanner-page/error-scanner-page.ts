import styles from './error-scanner-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { layout } from '@/components/layout/layout';

export class ErrorScannerPage implements IPage {
  public destroy: () => void;

  constructor() {
    this.destroy = (): void => {
      layout.clearRoot();
    };
  }

  public render(): void {
    const errorScanner: Component = new Component({ className: styles.errorScanner });
    layout.root.append(errorScanner);
  }
}
