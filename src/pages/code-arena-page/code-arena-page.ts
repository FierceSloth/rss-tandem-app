import type { IPage } from '@/common/types/types';
import type { Component } from '@/components/base/component';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';
import styles from './code-arena-page.module.scss';

export class CodeArenaPage implements IPage {
  public render(): Component {
    const root = new PageLayout({ className: styles.codeArena, withSidebar: false });
    return root;
  }

  public destroy(): void {}
}
