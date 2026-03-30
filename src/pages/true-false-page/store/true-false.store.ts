import { Store } from '@/common/store/store';
import type { ITrueFalseState } from '@/pages/true-false-page/common/types/types';
import { TrueFalseViewState } from '@/pages/true-false-page/common/enums/enums';

export const trueFalseStore = new Store<ITrueFalseState>({
  tasks: [],
  currentIndex: 0,
  correctAnswers: 0,
  status: TrueFalseViewState.LOADING,
  currentIndexAnswered: false,
});
