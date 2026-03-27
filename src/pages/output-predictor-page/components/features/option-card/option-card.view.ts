import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';
import { outputPredictorEmitter } from '@/pages/output-predictor-page/common/utils/output-predictor-emitter.utils';
import { OutputPredictorEvents } from '@/pages/output-predictor-page/common/enum/enum';

import { Card } from '@/components/layout/card/card.view';
import styles from './option-card.module.scss';
import { StatusBadge } from '@/components/ui/status-badge/status-badge.view';

interface IProps extends IComponentChild {
  optionKey: string;
  lines: string[];
  index: number;
}

export class OptionCard extends Card {
  public readonly optionKey: string;
  private readonly checkbox: Component;
  private readonly index: number;
  private isSelected = false;

  constructor({ className = [], optionKey, lines, index }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.optionCard, className);
    super({ className: cssClasses }, ...children);

    this.optionKey = optionKey;
    this.index = index;

    const title = new StatusBadge({
      text: '',
      className: styles.title,
      color: 'gray',
      dot: false,
      animation: 'none',
      capitalize: true,
    });

    const label = new Component({ className: styles.label, text: `OPTION ${optionKey}` });

    this.checkbox = new Component({
      tag: 'p',
      className: styles.checkbox,
      text: '[ ]',
    });

    title.append(label, this.checkbox);

    const list = new Component({ tag: 'ul', className: styles.list });
    lines.forEach((text) => {
      list.append(new Component({ tag: 'li', className: styles.item, text }));
    });

    this.append(title, list);
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
    this.checkbox.node.textContent = '[x]';
  }

  public markIncorrect(): void {
    this.addClass(styles.incorrect);
    this.checkbox.node.textContent = '[x]';
  }

  public disable(): void {
    this.node.removeEventListener('click', this.onClick);
  }

  private onClick = (): void => {
    if (this.isSelected) return;
    this.select();
    this.disable();
    outputPredictorEmitter.emit(OutputPredictorEvents.OPTION_SELECTED, {
      index: this.index,
      key: this.optionKey,
    });
  };
}
