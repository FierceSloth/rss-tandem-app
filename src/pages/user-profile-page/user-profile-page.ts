import styles from './user-profile-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

export class UserProfilePage implements IPage {
  public render(): Component {
    const profile: Component = new Component({ className: [styles.profile, 'pageContainer'] });
    return profile;
  }

  public destroy(): void {}
}
