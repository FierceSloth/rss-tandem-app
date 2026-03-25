import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';
import styles from './inline-code-text.module.scss';
import { EVEN } from '@/common/constants/constants';

interface IProps extends IComponentChild {
  tag?: keyof HTMLElementTagNameMap | undefined;
  text?: string;
}

export class InlineCodeText extends Component {
  constructor({ tag = 'span', className = [], text = '' }: IProps) {
    const cssClasses = mergeClassNames(styles.inlineCodeText, className);
    super({ tag, className: cssClasses });

    this.renderText(text);
  }

  public setInlineCodeText(text: string): void {
    this.renderText(text);
  }

  private renderText(text: string): void {
    this.destroyChildren();

    const normalizedText = text.replaceAll(String.raw`\n`, '\n');
    const parts = normalizedText.split('`');

    parts.forEach((part, index) => {
      if (index % EVEN === 1) {
        const code = new Component({
          tag: 'span',
          className: styles.code,
          text: part,
        });

        this.append(code);
      } else {
        this.node.append(document.createTextNode(part));
      }
    });
  }
}
