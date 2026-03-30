import type { IComponentChild } from '@common/types/types';
import type { Component } from '@components/base/component';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Footer } from '@/components/layout/footer/footer.view';

import styles from './code-arena-footer.module.scss';

interface IProps extends IComponentChild {}

export class CodeArenaFooter extends Footer {
  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.footer, className);

    super({ className: cssClasses }, ...children);
  }
}
