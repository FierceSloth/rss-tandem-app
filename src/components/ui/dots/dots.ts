import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';
import { DEFAULT_DOTS_COUNT } from '@/common/constants/constants';

import styles from './dots.module.scss';

interface IProps extends IComponentChild {
  dotsCount: number;
}

export class Dots extends Component {
  constructor({ className = [], dotsCount: number = DEFAULT_DOTS_COUNT }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.dots, className);

    super({ className: cssClasses }, ...children);
    this.createDots(number);
  }

  private createDots(dotsCount: number): void {
    for (let i = 0; i < dotsCount; i++) {
      const dot = new Component({ className: styles.dot });

      this.append(dot);
    }
  }
}
