import type { IComponentChild } from '@common/types/types';
import { TerminalLogType } from '@common/enums/enums';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';

import styles from './terminal.module.scss';

interface IProps extends IComponentChild {}

export class Terminal extends Component {
  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.terminal, className);
    super({ className: cssClasses }, ...children);
  }

  public print(text: string, type: TerminalLogType = TerminalLogType.DEFAULT): void {
    const entry = new Component({ className: styles[type] });

    let formattedText = text;
    const needsErrorPrefix = !formattedText.toLowerCase().startsWith('error') && !formattedText.startsWith('[ERROR]');

    if (type === TerminalLogType.ERROR && needsErrorPrefix) {
      formattedText = `[ERROR] ${formattedText}`;
    }

    const promptPrefix = new Component({
      tag: 'span',
      className: styles.prompt,
      text: '>',
    });
    const content = new Component({ tag: 'span', text: formattedText });

    entry.append(promptPrefix, content);
    this.append(entry);

    this.node.scrollTop = this.node.scrollHeight;
  }

  public clear(): void {
    this.destroyChildren();
  }
}
