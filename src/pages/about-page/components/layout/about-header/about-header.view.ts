import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './about-header.module.scss';
import { StatusBadge } from '@/components/ui/status-badge/status-badge.view';
import { messages } from '@/pages/about-page/common/constants/messages';

interface IProps extends IComponentChild {}

export class AboutHeader extends Component {
  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.aboutHeader, className);
    super({ className: cssClasses }, ...children);

    const badge: StatusBadge = new StatusBadge({
      className: styles.statusBadge,
      text: messages.titles.badge,
      color: 'green',
      textColor: 'gray',
      dotSize: '6',
      animation: 'pulse-dot',
      container: true,
    });

    const heading: Component = new Component({ tag: 'h1', className: styles.heading, text: messages.titles.heading });

    const description: Component = new Component({
      tag: 'p',
      className: styles.description,
      text: messages.titles.description,
    });

    this.append(badge, heading, description);
  }
}
