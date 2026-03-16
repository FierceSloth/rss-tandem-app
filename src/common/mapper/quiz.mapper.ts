import type { IQuiz } from '@common/types/types';
import type { IQuizDto, IQuizOptionsDto } from '@common/types/dto';
import { EMPTY } from '@common/constants/constants';

export function mapDtoToQuiz(data: IQuizDto[]): IQuiz[] {
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
}
