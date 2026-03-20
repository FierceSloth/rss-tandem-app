import type { QuizViewState } from '@/pages/quiz-page/common/enums/enums';
import type { UUID } from 'node:crypto';

/* ========================================================================== */
/*                         DTO (Data Transfer Objects)                        */
/* ========================================================================== */

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

/* ========================================================================== */
/*                          Entities (Domain Models)                          */
/* ========================================================================== */

export interface IQuiz {
  id: UUID | number;
  levelId: UUID | number;
  question: string;
  codeSnippet: string;
  options: IQuizOption[];
  language?: string;
  tags: string[];
}

export interface IQuizOption {
  text: string;
  isCorrect: boolean;
}

export interface IQuizMetadata {
  index: number;
  isCorrect: boolean;
}

/* ========================================================================== */
/*                                    State                                   */
/* ========================================================================== */

export interface IQuizState {
  tasks: IQuiz[];
  currentIndex: number;
  correctAnswers: number;
  status: QuizViewState;
  currentIndexAnswered: boolean;
}
