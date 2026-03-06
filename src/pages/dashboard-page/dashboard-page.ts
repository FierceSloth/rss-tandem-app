import styles from './dashboard-page.module.scss';
import type { IPage } from '@/common/types/types';
import type { Component } from '@/components/base/component';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';

export class DashboardPage implements IPage {
  public render(): Component {
    const root = new PageLayout({ className: styles.dashboard, withSidebar: true });
    return root;
  }

  public destroy(): void {}
}
