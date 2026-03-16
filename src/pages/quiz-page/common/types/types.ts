import type { IQuiz } from '@/common/types/types';
import type { QuizViewState } from '@/pages/quiz-page/common/enums/enums';

export interface IQuizState {
  tasks: IQuiz[];
  currentIndex: number;
  correctAnswers: number;
  status: QuizViewState;
  currentIndexAnswered: boolean;
}
