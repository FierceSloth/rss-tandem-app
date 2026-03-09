import styles from './auth-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { Modal } from './components/features/modal/modal.view';

export class AuthPage implements IPage {
  public render(): Component {
    const auth: Component = new Component({ className: [styles.auth, 'pageContainer'] });

    const modal = new Modal({});

    auth.append(modal);
    return auth;
  }

  public destroy(): void {}
}
