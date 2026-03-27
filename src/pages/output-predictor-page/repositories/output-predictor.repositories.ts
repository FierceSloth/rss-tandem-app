import { supabase } from '@/api/supabase/supabase-client';
import type { IOutputPredictor } from '../common/types/types';
import { outputPredictorMapper } from '../common/utils/mapper';

export class OutputPredictorRepository {
  public async fetchQuestions(levelId: string): Promise<IOutputPredictor[]> {
    const { data, error } = await supabase
      .from('output_predictor_questions')
      .select(
        `
        id,
        level_id,
        title,
        code,
        tag,
        options
      `
      )
      .eq('level_id', levelId)
      .order('id', { ascending: true });

    if (error) throw error;
    return outputPredictorMapper.mapDtoToQuestions(data);
  }
}
