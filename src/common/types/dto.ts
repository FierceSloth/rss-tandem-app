import type { UUID } from 'node:crypto';

export interface IQuizDto {
  id: UUID | number;
  level_id: UUID | number;
  question: string;
  options: IQuizOptionsDto[];
  code_snippet?: string;
  language?: string;
  tags?: string[];
}

export interface IQuizOptionsDto {
  text: string;
  is_correct: boolean;
}
