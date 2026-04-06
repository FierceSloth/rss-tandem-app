import type { OutputPredictorViewState } from '../enum/enum';

export interface IOutputPredictorOptionDto {
  key: string;
  lines: string[];
  is_correct: boolean;
}

export interface IOutputPredictorOption {
  key: string;
  lines: string[];
  isCorrect: boolean;
}

export interface IOutputPredictor {
  id: string;
  levelId: string;
  title: string;
  code: string;
  tag: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  options: IOutputPredictorOption[];
}

export interface IOutputPredictorState {
  tasks: IOutputPredictor[];
  currentIndex: number;
  selectedKey: string | null;
  isAnswered: boolean;
  correctAnswers: number;
  status: OutputPredictorViewState;
}

export interface IOutputPredictorDto {
  id: string;
  level_id: string;
  title: string;
  code: string;
  tag: string;
  options: IOutputPredictorOptionDto[];
  levels: { difficulty: 'EASY' | 'MEDIUM' | 'HARD' }[];
}
