import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';

import styles from './status-badge.module.scss';

type BadgeColor = 'green' | 'blue' | 'gray' | 'red';

interface IProps extends IComponentChild {
  text: string;
  color?: BadgeColor;
  animation?: boolean;
  container?: boolean;
  dot?: boolean;
}

export class StatusBadge extends Component {
  private textElement: Component;

  constructor(
    { className = [], text, color = 'green', dot = true, animation = true, container = false }: IProps,
    ...children: Component[]
  ) {
    const cssClasses = mergeClassNames(
      styles.statusBadge,
      styles[`color-${color}`],
      animation && styles.animation,
      container && styles.container,
      className
    );
    super({ className: cssClasses }, ...children);

    if (dot) {
      const dotElement = new Component({ tag: 'span', className: styles.dot });
      this.append(dotElement);
    }

    this.textElement = new Component({ tag: 'span', className: styles.text, text });
    this.append(this.textElement);
  }

  public setText(text: string): this {
    this.textElement.setText(text);
    return this;
  }
}
