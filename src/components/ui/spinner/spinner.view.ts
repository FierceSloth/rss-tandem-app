import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './spinner.module.scss';

interface IProps extends IComponentChild {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'blue' | 'green' | 'red' | 'orange';
}

export class Spinner extends Component {
  constructor({ className = [], size = 'md', variant = 'blue' }: IProps = {}, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.spinner, styles[size], styles[variant], className);

    super({ className: cssClasses }, ...children);
  }
}
