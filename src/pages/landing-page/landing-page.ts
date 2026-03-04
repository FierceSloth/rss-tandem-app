import styles from './landing-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

export class LandingPage implements IPage {
  public render(): Component {
    const landing: Component = new Component({ className: [styles.landing, 'pageContainer'] });
    return landing;
  }

  public destroy(): void {}
}
