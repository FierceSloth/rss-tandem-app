import { Store } from '@/common/store/store';
import { OutputPredictorViewState } from '../common/enum/enum';
import type { IOutputPredictorState } from '../common/types/types';

export const outputPredictorStore = new Store<IOutputPredictorState>({
  tasks: [],
  currentIndex: 0,
  selectedKey: null,
  isAnswered: false,
  correctAnswers: 0,
  status: OutputPredictorViewState.LOADING,
});
