import { supabase } from '@/api/supabase/supabase-client';
import type { ITheoryHubEntity } from '../common/types/types';
import { theoryHubMapper } from '../common/utils/theory-hub-mapper.util';

export class TheoryHubRepository {
  public async fetchLevelById(levelId: string): Promise<ITheoryHubEntity> {
    const { data, error } = await supabase
      .from('theory_hubs')
      .select(
        `
        id,
        level_id,
        title,
        description,
        materials
      `
      )
      .eq('level_id', levelId)
      .single();

    if (error) {
      throw error;
    }

    return theoryHubMapper.mapTask(data);
  }
}

export const theoryHubRepository = new TheoryHubRepository();
