import styles from './about-page.module.scss';
import type { IPage } from '@/common/types/types';
import type { Component } from '@/components/base/component';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';

export class AboutPage implements IPage {
  public render(): Component {
    const root = new PageLayout({ className: styles.about, withSidebar: false });
    return root;
  }

  public destroy(): void {}
}
