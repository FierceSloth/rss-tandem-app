import { supabase } from '@/api/supabase/supabase-client';
import type { IUserDetails } from '@/service/user-service/types/types';

export class UserProfileRepository {
  public async deleteProfile(userId: string | null): Promise<void> {
    const { error } = await supabase.from('profiles').delete().eq('id', userId);

    if (error) throw error;
  }

  public async fetchUserData(userId: string): Promise<IUserDetails> {
    const { data, error } = await supabase
      .from('profiles')
      .select(
        `
        id,
        username,
        email
      `
      )
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }
}
