import styles from './user-profile-page.module.scss';
import type { IPage } from '@/common/types/types';
import type { Component } from '@/components/base/component';
import { Footer } from '@/components/layout/footer/footer.view';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';
import { UserProfile } from './components/layout/user-profile/user-profile';
import { UserProfileHeader } from './components/layout/user-profile-header/user-profile-header.view';

export class UserProfilePage implements IPage {
  public render(): Component {
    const root = new PageLayout(
      {
        className: styles.profile,
        withSidebar: true,
        header: new UserProfileHeader({}),
        footer: new Footer({}),
      },
      new UserProfile({})
    );
    return root;
  }

  public destroy(): void {}
}
