import { STORAGE_KEYS } from '@/common/constants/constants';
import type { UserDetails } from '@/service/user-service/types';

export class UserService {
  public static getUserDetails(): UserDetails | null {
    const currentUser: string | null = localStorage.getItem(STORAGE_KEYS.AUTH);
    return currentUser ? JSON.parse(currentUser) : null;
  }

  public static isAuthenticated(): boolean {
    const currentUser = UserService.getUserDetails();
    return Boolean(currentUser);
  }
}
