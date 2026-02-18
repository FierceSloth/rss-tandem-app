import type { IComponentChild } from '@/common/types/types';
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
    const cssClasses = [
      styles.card,
      styles[`padding-${padding}`],
      ...(glass ? [styles.glass] : []),
      ...(Array.isArray(className) ? className : [className]),
    ];
    super({ tag: tag, className: cssClasses }, ...children);
  }
}
