import { supabase } from '@/api/supabase/supabase-client';
import type { ITheoryHubEntity } from '../common/types/types';
import { theoryHubMapper } from '../common/utils/theory-hub-mapper.util';
import { eventLoopTheoryMock } from './theory-hub.mock';

export class TheoryHubRepository {
  public async fetchLevelById(levelId: string): Promise<ITheoryHubEntity> {
    const { data, error } = await supabase
      .from('theory_hub_data')
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

  public async fetchMockTask(): Promise<ITheoryHubEntity> {
    const laborIllusionTime = 1000;
    const errorChange = 0.01;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() >= errorChange) {
          const entity = theoryHubMapper.mapTask(eventLoopTheoryMock);
          resolve(entity);
        } else {
          reject(new Error('Не удалось загрузить виджет'));
        }
      }, laborIllusionTime);
    });
  }
}

export const codeArenaRepository = new TheoryHubRepository();
