import { supabase } from '@/api/supabase/supabase-client';
import type { IQuiz } from '@/common/types/types';
import { mapDtoToQuiz } from '@/common/mapper/quiz.mapper';

export class QuizRepository {
  public async fetchQuestions(levelId: string): Promise<IQuiz[]> {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select(
        `
        id,
        level_id,
        question,
        options,
        code_snippet,
        language,
        tags
      `
      )
      .eq('level_id', levelId)
      .order('id', { ascending: true });

    console.log(levelId, data);

    if (error) throw error;
    return mapDtoToQuiz(data);
  }
}
