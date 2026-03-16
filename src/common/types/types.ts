import type { Component } from '@/components/base/component';
import type { UUID } from 'node:crypto';

/* ========================================================================== */
/*                              Global Interfaces                             */
/* ========================================================================== */

export interface IComponent {
  tag?: keyof HTMLElementTagNameMap;
  className?: string | string[];
  text?: string;
  attrs?: Record<string, string>;
}

export interface IComponentChild {
  className?: string[] | string;
}

export interface IPage {
  render: () => Component;
  destroy: () => void;
}

/* ========================================================================== */
/*                            Validation Interfaces                           */
/* ========================================================================== */

export interface IValidateResult {
  isValid: boolean;
  errorMessage?: string;
}

/* ========================================================================== */
/*                              System Intefaces                              */
/* ========================================================================== */
export interface SystemInfo {
  browser: string;
  os: string;
}

/* ========================================================================== */
/*                                  Entities                                  */
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

export interface IScore {
  correct: number;
  total: number;
}
