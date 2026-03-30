import type { UUID } from 'node:crypto';
import type { TrueFalseViewState, Action } from '@/pages/true-false-page/common/enums/enums';

/* ========================================================================== */
/*                         DTO (Data Transfer Objects)                        */
/* ========================================================================== */

export interface ITrueFalseDto {
  id: UUID | number;
  level_id: UUID | number;
  code_snippet?: string;
  answer: string;
  is_correct: boolean;
  tag?: string;
  levels: ILevel[];
}

/* ========================================================================== */
/*                          Entities (Domain Models)                          */
/* ========================================================================== */

export interface ITrueFalse {
  id: UUID | number;
  levelId: UUID | number;
  codeSnippet: string;
  answer: string;
  isCorrect: boolean;
  tag: string;
  moduleId: number;
}

export interface ILevel {
  id: UUID | number;
  module_id: number;
}

export interface ITrueFalseMetadata {
  action: Action;
  isCorrect?: boolean;
}

/* ========================================================================== */
/*                                    State                                   */
/* ========================================================================== */

export interface ITrueFalseState {
  tasks: ITrueFalse[];
  currentIndex: number;
  correctAnswers: number;
  status: TrueFalseViewState;
  currentIndexAnswered: boolean;
}
