import styles from './landing-badge.module.scss';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';
import { StatusBadge } from '@/components/ui/status-badge.ts/status-badge.view';
import { messages } from '@/pages/landing-page/common/constants/messages';

interface IProps extends IComponentChild {}

export class LandingBadge extends Component {
  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.landingBadge, className);
    super({ className: cssClasses }, ...children);

    const badgeSystemOnline: StatusBadge = new StatusBadge({
      text: messages.titles.systemOnline,
      animation: 'none',
      capitalize: false,
    });

    this.append(badgeSystemOnline);
  }
}
