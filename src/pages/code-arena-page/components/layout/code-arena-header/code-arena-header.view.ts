import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './code-arena-header.module.scss';
import { StatusBadge } from '@/components/ui/status-badge/status-badge.view';
import { messages } from '@/pages/code-arena-page/common/constants/messages';

interface IProps extends IComponentChild {
  titleText: string;
  topicText: string;
}

export class CodeArenaHeader extends Component {
  constructor({ className = [], titleText = '', topicText = '' }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.header, className);

    super({ tag: 'header', className: cssClasses }, ...children);

    const taskInfo = new Component({ className: styles.taskInfo });
    const title = new Component({ tag: 'h1', className: styles.title, text: titleText });
    const tag = new StatusBadge({
      className: styles.tag,
      text: messages.titles.inProgress(topicText),
      capitalize: true,
      color: 'blue',
      dot: false,
      animation: 'pulse-slow',
    });

    taskInfo.append(tag, title);
    this.append(taskInfo);
  }
}
