import { EventEmitter } from '@/common/utils/emitter.util';
import type { QuizEvents } from '@/pages/quiz-page/common/enums/enums';

export const quizEmitter = new EventEmitter<QuizEvents>();
