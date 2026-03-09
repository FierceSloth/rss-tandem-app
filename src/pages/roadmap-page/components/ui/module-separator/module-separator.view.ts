import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './module-separator.module.scss';

interface IProps extends IComponentChild {
  text: string;
  displayId: string;
}

const idLength = 2;

export class ModuleSeparator extends Component {
  constructor({ className = [], text = '', displayId = '' }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.moduleSeparator, className);

    super({ className: cssClasses }, ...children);

    const leftLine = new Component({ className: styles.moduleLine });
    const rightLine = new Component({ className: styles.moduleLine });

    const label = new Component({
      tag: 'span',
      className: styles.moduleLabel,
      text: `MODULE ${String(displayId.padStart(idLength, '0'))}: ${text}`,
    });

    this.append(leftLine, label, rightLine);
  }
}
