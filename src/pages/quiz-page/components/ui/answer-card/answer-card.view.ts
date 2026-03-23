import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';
import correctIcon from '@assets/svg/common/correct.svg?raw';
import incorrectIcon from '@assets/svg/common/incorrect.svg?raw';
import { createSvgComponent } from '@/common/utils/create-svg.util';

import styles from './answer-card.module.scss';
import { quizEmitter } from '@/pages/quiz-page/common/utils/quiz-emmiter.util';
import { QuizEvents } from '@/pages/quiz-page/common/enums/enums';
import { InlineCodeText } from '@/components/ui/inline-code-text/inline-code-text.view';

interface IProps extends IComponentChild {
  keyHint: string;
  answerText: string;
  isCorrect: boolean;
  index?: number;
}

export class AnswerCard extends Component {
  public isCorrect: boolean;
  private index: number;
  private keyHint?: Component;
  private answerText?: Component;
  private isSelected = false;
  private checkbox?: Component;

  constructor(
    { className = [], keyHint = '', answerText = '', isCorrect = false, index = 0 }: IProps,
    ...children: Component[]
  ) {
    const cssClasses = mergeClassNames(styles.answerCard, className);
    super({ className: cssClasses }, ...children);

    this.isCorrect = isCorrect;
    this.index = index;

    this.keyHint = new Component({ className: styles.keyHint, text: keyHint });
    this.answerText = new InlineCodeText({ className: styles.answerText, text: answerText });

    const answer = new Component({ className: styles.answerContent });

    this.checkbox = new Component({ className: styles.checkbox });

    answer.append(this.keyHint, this.answerText);
    this.append(answer, this.checkbox);

    this.node.addEventListener('click', this.onClick);
  }

  public select(): void {
    if (this.isSelected) return;

    this.isSelected = true;
    this.addClass(styles.selected);
  }

  public deselect(): void {
    this.isSelected = false;
    this.removeClass(styles.selected);
  }

  public markCorrect(): void {
    this.addClass(styles.correct);
    if (this.checkbox) {
      const icon = createSvgComponent(correctIcon);
      this.checkbox.node.append(icon);
    }
  }

  public markIncorrect(): void {
    this.addClass(styles.incorrect);
    if (this.checkbox) {
      const icon = createSvgComponent(incorrectIcon);
      this.checkbox.node.append(icon);
    }
  }

  public disable(): void {
    this.node.removeEventListener('click', this.onClick);
  }

  private onClick = (): void => {
    if (this.isSelected) return;
    this.select();
    this.disable();
    quizEmitter.emit(QuizEvents.ANSWER, { index: this.index, isCorrect: this.isCorrect });
  };
}
