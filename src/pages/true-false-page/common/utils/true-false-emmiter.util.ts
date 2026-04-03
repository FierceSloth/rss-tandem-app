import { EventEmitter } from '@/common/utils/emitter.util';
import type { TrueFalseEvents } from '@/pages/true-false-page/common/enums/enums';

export const trueFalseEmitter = new EventEmitter<TrueFalseEvents>();
