import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';

import styles from './card.module.scss';

type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'hg';

interface IProps extends IComponentChild {
  tag?: keyof HTMLElementTagNameMap;
  padding?: CardPadding;
  glass?: boolean;
}

export class Card extends Component {
  constructor({ tag = 'div', className = [], glass = false, padding = 'md' }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.card, styles[`padding-${padding}`], glass && styles.glass, className);
    super({ tag: tag, className: cssClasses }, ...children);
  }
}
