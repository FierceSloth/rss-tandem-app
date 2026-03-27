import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';
import { StatusBadge } from '@/components/ui/status-badge/status-badge.view';
import { messages } from '@/pages/theory-hub-page/common/constants/messages';

import styles from './theory-hub-header.module.scss';

interface IProps extends IComponentChild {
  titleText?: string;
}

export class TheoryHubHeader extends Component {
  constructor({ className = [], titleText = messages.header.title }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.header, className);
    super({ tag: 'header', className: cssClasses }, ...children);

    const subTitle = new StatusBadge({
      className: styles.subTitle,
      text: messages.header.subTitle,
      color: 'green',
      capitalize: true,
      animation: 'pulse-slow',
      dot: false,
    });
    const title = new Component({
      tag: 'h1',
      className: styles.title,
      text: titleText,
    });
    const textContainer = new Component({ className: styles.textContainer }, subTitle, title);

    const container = new Component({ className: styles.container }, textContainer);
    this.append(container);
  }
}
