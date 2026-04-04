import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';
import type { OptionCard } from '../option-card/option-card.view';

import styles from './output-options.module.scss';
import { messages } from '@/pages/output-predictor-page/common/constants/messages';

interface IProps extends IComponentChild {}

export class OutputOptions extends Component {
  public readonly title: Component;
  public readonly container: Component;
  public cards: OptionCard[];

  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.outputOptionsContainer, className);
    super({ className: cssClasses }, ...children);

    this.title = new Component({
      tag: 'h2',
      className: styles.title,
      text: messages.labels.predictOutputSequence,
    });

    this.container = new Component({ className: styles.container });
    this.cards = [];

    this.append(this.title, this.container);
  }

  public setOptions(cards: OptionCard[]): void {
    this.container.destroyChildren();
    this.cards = cards;
    this.container.append(...cards);
  }

  public checkAnswers(selectedKey: string, correctKey: string): void {
    this.cards.forEach((card) => {
      if (card.optionKey === correctKey) {
        card.markCorrect();
      } else if (card.optionKey === selectedKey) {
        card.markIncorrect();
      }
      card.disable();
    });
  }
}
