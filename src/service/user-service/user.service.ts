import { STORAGE_KEYS } from '@/common/constants/constants';
import type { UserDetails } from '@/service/user-service/types';

export class UserService {
  public static getUserDetails(): UserDetails | null {
    const currentUserAsString: string | null = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (!currentUserAsString) {
      return null;
    }
    const currentUser: UserDetails = JSON.parse(currentUserAsString);
    return currentUser;
  }

  public static isAuthenticated(): boolean {
    const currentUser = UserService.getUserDetails();
    return Boolean(currentUser);
  }
}
