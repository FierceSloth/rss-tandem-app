import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './card.module.scss';

type CardColor = 'gray' | 'green' | 'red' | 'blue';
type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'hg';

interface IProps extends IComponentChild {
  tag?: keyof HTMLElementTagNameMap;
  padding?: CardPadding;
  color?: CardColor;
  glass?: boolean;
}

export class Card extends Component {
  constructor(
    { tag = 'div', className = [], glass = false, padding = 'md', color = 'gray' }: IProps,
    ...children: Component[]
  ) {
    const cssClasses = mergeClassNames(
      styles.card,
      styles[`padding-${padding}`],
      styles[`color-${color}`],
      glass && styles.glass,
      className
    );
    super({ tag: tag, className: cssClasses }, ...children);
  }
}
