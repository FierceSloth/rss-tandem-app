import { supabase } from '@/api/supabase/supabase-client';
import type { ITrueFalse } from '@/pages/true-false-page/common/types/types';
import { trueFalseMapper } from '@pages/true-false-page/common/utils/true-false-mapper.util';

export class TrueFalseRepository {
  public async fetchQuestions(levelId: string): Promise<ITrueFalse[]> {
    const { data, error } = await supabase
      .from('true_false_questions')
      .select(
        `
        id,
        level_id,
        code_snippet,
        answer,
        is_correct,
        tag,
        levels(id, module_id)
      `
      )
      .eq('level_id', levelId)
      .order('id', { ascending: true });

    console.log(data);

    if (error) throw error;
    return trueFalseMapper.mapDtoToTrueFalse(data);
  }
}
