import styles from './theory-hub-page.module.scss';
import type { IPage } from '@/common/types/types';
import type { Component } from '@/components/base/component';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';
import { TheoryHubHeader } from './components/layout/theory-hub-header/theory-hub-header.view';

export class TheoryHubPage implements IPage {
  public render(): Component {
    const header = new TheoryHubHeader({});
    const root = new PageLayout({ className: styles.theoryHub, withSidebar: false, header });
    return root;
  }

  public destroy(): void {}
}
