import { EventEmitter } from '@/common/utils/emitter.util';
import type { OutputPredictorEvents } from '../enum/enum';

export const outputPredictorEmitter = new EventEmitter<OutputPredictorEvents>();
