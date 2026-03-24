import { supabase } from '@/api/supabase/supabase-client';
import type { ICodeArenaEntities } from '../common/types/types';
import { codeArenaMapper } from '../common/utils/code-arena-mapper.util';
import { evenOrOddMockData } from './code-arena.mock';

export class CodeArenaRepository {
  public async fetchTaskById(taskId: string): Promise<ICodeArenaEntities> {
    const { data, error } = await supabase
      .from('tasks')
      .select(
        `
        id,
        title,
        topic,
        description,
        initial_code,
        tests
      `
      )
      .eq('id', taskId)
      .single();

    if (error) {
      throw error;
    }

    return codeArenaMapper.mapTask(data);
  }

  public async fetchMockTask(): Promise<ICodeArenaEntities> {
    const laborIllusionTime = 1000;
    const errorChange = 0.01;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() >= errorChange) {
          const entity = codeArenaMapper.mapTask(evenOrOddMockData);
          resolve(entity);
        } else {
          reject(new Error('Не удалось загрузить виджет'));
        }
      }, laborIllusionTime);
    });
  }
}

export const codeArenaRepository = new CodeArenaRepository();
