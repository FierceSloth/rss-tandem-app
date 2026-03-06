import styles from './auth-page.module.scss';
import type { IPage } from '@/common/types/types';
import type { Component } from '@/components/base/component';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';

export class AuthPage implements IPage {
  public render(): Component {
    const root = new PageLayout({ className: styles.auth, withSidebar: false });
    return root;
  }

  public destroy(): void {}
}
