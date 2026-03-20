import { supabase } from '@/api/supabase/supabase-client';
import type { IQuiz } from '@/pages/quiz-page/common/types/types';
import { quizMapper } from '@pages/quiz-page/common/utils/quiz-mapper.util';

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

    if (error) throw error;
    return quizMapper.mapDtoToQuiz(data);
  }
}
