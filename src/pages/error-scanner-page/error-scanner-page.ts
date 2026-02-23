import styles from './error-scanner-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

export class ErrorScannerPage implements IPage {
  public render(): Component {
    const errorScanner: Component = new Component({ className: [styles.errorScanner, 'pageContainer'] });
    return errorScanner;
  }

  public destroy(): void {}
}
