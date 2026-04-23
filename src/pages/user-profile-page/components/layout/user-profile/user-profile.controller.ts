import { UserService } from '@/service/user-service/user.service';
import type { UserProfile } from './user-profile';
import type { IUserDetails } from '@/service/user-service/types/types';
import { EMPTY } from '@/common/constants/constants';
import { UserProfileRepository } from '@/pages/user-profile-page/repositories/user-profile.repository';
import { messages } from '@/pages/user-profile-page/common/constants/messages';
import { authService } from '@/service/auth/auth.service';

export class UserProfileController {
  private view: UserProfile;
  private profileRepository: UserProfileRepository;
  private userId: string | null = null;

  constructor(view: UserProfile) {
    this.view = view;
    this.profileRepository = new UserProfileRepository();

    this.initListener();
    void this.fillUserDetails();
  }

  private onDelete = (): void => {
    if (!this.userId) {
      return;
    }

    const confirmed = confirm(messages.messages.confirmDelete);
    if (!confirmed) {
      return;
    }

    try {
      void this.deleteProfile(this.userId);
      console.info(messages.messages.deletedSuccessfully);
    } catch (error) {
      console.error(messages.errors.failedDeleteProfile, error);
    }
  };

  private async fillUserDetails(): Promise<void> {
    try {
      let userDetails: IUserDetails | null = await UserService.getUserDetails();
      if (!userDetails) {
        return;
      }

      this.userId = userDetails.id;
      userDetails = await this.profileRepository.fetchUserData(this.userId);
      console.log(userDetails);
      this.view.email.setValue(userDetails.email ?? EMPTY);
      this.view.username.setValue(userDetails.username ?? EMPTY);
    } catch (error) {
      console.error(messages.errors.failedLoadUserProfile, error);
      this.view.email.setValue(EMPTY);
      this.view.username.setValue(EMPTY);
    }
  }

  private async deleteProfile(userId: string): Promise<void> {
    await this.profileRepository.deleteProfile(userId);
    await authService.logout();
  }

  private initListener(): void {
    this.view.deleteProfileButton.addListener('click', this.onDelete);
  }
}
