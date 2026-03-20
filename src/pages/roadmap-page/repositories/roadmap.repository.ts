import type { IModuleEntity } from '../common/types/types';
import { roadmapMapper } from '../common/utils/roadmap-mapper.util';
import { supabase } from '@/api/supabase/supabase-client';

export class RoadmapRepository {
  public async fetchModules(): Promise<IModuleEntity[]> {
    const { data, error } = await supabase.from('modules').select(`
      id,
      title,
      levels (
        id,
        title,
        description,
        widget_type,
        difficulty,
        user_level_progress (
          status,
          stars
        )
      )
    `);

    if (error) {
      throw error;
    }

    return roadmapMapper.mapModulesList(data);
  }
}

export const roadmapRepository = new RoadmapRepository();
