import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './dots.module.scss';

type Size = 'sm' | 'md' | 'lg' | 'hg';

interface IProps extends IComponentChild {
  size?: Size;
  colored?: boolean;
}

const DOTS_COUNT = 3;

export class Dots extends Component {
  constructor({ className = [], size = 'hg', colored = true }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.dots, styles[`size-${size}`], colored && styles['colored'], className);

    super({ className: cssClasses }, ...children);

    this.createDots();
  }

  private createDots(): void {
    for (let i = 0; i < DOTS_COUNT; i++) {
      const dot = new Component({ className: styles.dot });

      this.append(dot);
    }
  }
}
