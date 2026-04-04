import type { IUserDetails } from '@/service/user-service/types/types';
import { supabase } from '@/api/supabase/supabase-client';
import { userMapper } from './utils/user-mapper.util';
import { authStore } from '@/service/auth/auth-store';

export class UserService {
  public static async getUserDetails(): Promise<IUserDetails | null> {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return null;
    return userMapper.mapToUserDetails(data.session.user);
  }

  public static isAuthenticated(): boolean {
    return authStore.isAuthenticated();
  }
}
