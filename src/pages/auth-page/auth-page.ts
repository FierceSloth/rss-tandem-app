import styles from './auth-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

export class AuthPage implements IPage {
  public render(): Component {
    const auth: Component = new Component({ className: [styles.auth, 'pageContainer'] });
    return auth;
  }

  public destroy(): void {}
}
