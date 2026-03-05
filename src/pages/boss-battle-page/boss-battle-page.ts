import styles from './boss-battle-page.module.scss';
import type { IPage } from '@/common/types/types';
import type { Component } from '@/components/base/component';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';

export class BossBattlePage implements IPage {
  public render(): Component {
    const root = new PageLayout({ className: styles.bossBattle, withSidebar: false });
    return root;
  }

  public destroy(): void {}
}
