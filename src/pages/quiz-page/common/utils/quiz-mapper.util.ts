import { EMPTY } from '@common/constants/constants';
import type { IQuiz, IQuizDto, IQuizOptionsDto } from '@/pages/quiz-page/common/types/types';

export const quizMapper = {
  mapDtoToQuiz(data: IQuizDto[]): IQuiz[] {
    return data.map((quiz) => ({
      id: quiz.id,
      levelId: quiz.level_id,
      question: quiz.question,
      codeSnippet: quiz.code_snippet || EMPTY,
      language: quiz.language,
      options: quiz.options.map((option: IQuizOptionsDto) => ({
        text: option.text,
        isCorrect: option.is_correct,
      })),
      tags: quiz.tags || [],
    }));
  },
};
