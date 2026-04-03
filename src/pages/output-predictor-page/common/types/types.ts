import type { OutputPredictorViewState } from '../enum/enum';

export interface IOutputPredictorOption {
  key: string;
  lines: string[];
  is_correct: boolean;
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
