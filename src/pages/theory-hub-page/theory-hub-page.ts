import styles from './theory-hub-page.module.scss';
import type { IPage } from '@/common/types/types';
import type { Component } from '@/components/base/component';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';

export class TheoryHubPage implements IPage {
  public render(): Component {
    const root = new PageLayout({ className: styles.theoryHub, withSidebar: false });
    return root;
  }

  public destroy(): void {}
}
