import { supabase } from '@/api/supabase/supabase-client';
import type { IUserLevelProgress } from '@/common/types/types';

export class UserLevelProgressRepository {
  public async saveUserLevelProgress(progress: IUserLevelProgress): Promise<void> {
    const { error } = await supabase.from('user_level_progress').upsert(
      {
        user_id: progress.user_id,
        level_id: progress.level_id,
        status: progress.status,
        stars: progress.stars,
      },
      {
        onConflict: 'user_id,level_id',
      }
    );

    if (error) {
      throw error;
    }
  }
}

export const userLevelProgressRepository = new UserLevelProgressRepository();
