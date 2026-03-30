import { supabase } from '@/api/supabase/supabase-client';
import type { ICodeArenaEntities } from '../common/types/types';
import { codeArenaMapper } from '../common/utils/code-arena-mapper.util';

export class CodeArenaRepository {
  public async fetchLevelById(levelId: string): Promise<ICodeArenaEntities> {
    const { data, error } = await supabase
      .from('code_arena_questions')
      .select(
        `
        id,
        level_id,
        title,
        topic,
        description,
        initial_code,
        tests
      `
      )
      .eq('level_id', levelId)
      .single();

    if (error) {
      throw error;
    }

    return codeArenaMapper.mapTask(data);
  }
}

export const codeArenaRepository = new CodeArenaRepository();
