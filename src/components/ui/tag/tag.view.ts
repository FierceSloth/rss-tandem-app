import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './tag.module.scss';

type Color = 'primary' | 'green' | 'green-dark' | 'blue' | 'gray' | 'red';

type Padding = 'none' | 'sm' | 'md' | 'lg' | 'hg';

interface IProps extends IComponentChild {
  text: string;
  capitalize?: boolean;
  color?: Color;
  padding?: Padding;
}

export class Tag extends Component {
  private textElement: Component;

  constructor(
    { className = [], text, capitalize = true, color = 'green', padding = 'none' }: IProps,
    ...children: Component[]
  ) {
    const cssClasses = mergeClassNames(
      styles.tag,
      styles[`color-${color}`],
      capitalize && styles.uppercase,
      className,
      padding && styles[`padding-${padding}`]
    );
    super({ className: cssClasses }, ...children);

    this.textElement = new Component({ tag: 'span', className: styles.text, text });
    this.append(this.textElement);
  }

  public setText(text: string): this {
    this.textElement.setText(text);
    return this;
  }
}
