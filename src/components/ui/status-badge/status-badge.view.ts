import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './status-badge.module.scss';

type BadgeColor = 'primary' | 'green' | 'green-dark' | 'blue' | 'gray' | 'red';

type AnimationVariant = 'none' | 'pulse' | 'pulse-dot' | 'pulse-ring' | 'pulse-slow';

interface IProps extends IComponentChild {
  text: string;
  capitalize?: boolean;
  color?: BadgeColor;
  textColor?: BadgeColor;
  animation?: AnimationVariant;
  container?: boolean;
  dot?: boolean;
  dotSize?: string;
}

export class StatusBadge extends Component {
  private textElement: Component;

  constructor(
    {
      className = [],
      text,
      textColor,
      capitalize = true,
      color = 'green',
      dot = true,
      dotSize = '8',
      animation = 'pulse-ring',
      container = false,
    }: IProps,
    ...children: Component[]
  ) {
    const cssClasses = mergeClassNames(
      styles.statusBadge,
      styles[`color-${color}`],
      textColor ? styles[`text-color-${textColor}`] : styles[`text-color-${color}`],
      animation === 'none' ? undefined : styles[`animation-${animation}` as const],
      container && styles.container,
      capitalize && styles.uppercase,
      className
    );
    super({ className: cssClasses }, ...children);
    this.node.style.setProperty(
      '--badge-dot-size',
      dotSize.endsWith('px') || dotSize.endsWith('rem') ? `${dotSize}` : `${dotSize}px`
    );

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
