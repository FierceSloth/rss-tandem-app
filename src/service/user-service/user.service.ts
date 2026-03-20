import type { UserDetails } from '@/service/user-service/types';
import { supabase } from '@/api/supabase/supabase-client';

export class UserService {
  public static async getUserDetails(): Promise<UserDetails | null> {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return null;
    return {
      username: data.session.user.user_metadata?.['username'] ?? '',
      email: data.session.user.email ?? '',
    };
  }

  public static isAuthenticated(): boolean {
    const keys = Object.keys(localStorage);
    return keys.some((key) => key.startsWith('sb-') && key.endsWith('-auth-token'));
  }
}
