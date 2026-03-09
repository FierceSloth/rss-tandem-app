import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './module-separator.module.scss';

interface IProps extends IComponentChild {
  title: string;
}

export class ModuleSeparator extends Component {
  constructor({ className = [], title = '' }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.moduleSeparator, className);

    super({ className: cssClasses }, ...children);

    const leftLine = new Component({ className: styles.moduleLine });
    const rightLine = new Component({ className: styles.moduleLine });

    const label = new Component({
      tag: 'span',
      className: styles.moduleLabel,
      text: title,
    });

    this.append(leftLine, label, rightLine);
  }
}
