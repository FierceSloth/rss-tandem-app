import styles from './dashboard-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

export class DashboardPage implements IPage {
  public render(): Component {
    const dashboard: Component = new Component({ className: [styles.dashboard, 'pageContainer'] });
    return dashboard;
  }

  public destroy(): void {}
}
