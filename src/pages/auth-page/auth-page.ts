import styles from './auth-page.module.scss';
import type { IPage } from '@/common/types/types';
import type { Component } from '@/components/base/component';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';

import { Modal } from './components/features/modal/modal.view';
import { ModalController } from './components/features/modal/modal.controller';

export class AuthPage implements IPage {
  private modalController: ModalController | null = null;

  public render(): Component {
    const root = new PageLayout({ className: styles.auth, withSidebar: false });

    const modal = new Modal({});
    this.modalController = new ModalController(modal);

    root.append(modal);
    return root;
  }

  public destroy(): void {}
}
