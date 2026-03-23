import { Store } from '@/common/store/store';
import { QuizViewState } from '@/pages/quiz-page/common/enums/enums';
import type { IQuizState } from '@/pages/quiz-page/common/types/types';

export const quizStore = new Store<IQuizState>({
  tasks: [],
  currentIndex: 0,
  correctAnswers: 0,
  status: QuizViewState.LOADING,
  currentIndexAnswered: false,
});
