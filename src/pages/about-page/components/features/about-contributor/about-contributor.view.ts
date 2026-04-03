import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';
import { messages } from '@/pages/about-page/common/constants/messages';
import type { IContributor } from '@/pages/about-page/common/types/types';

import styles from './about-contributor.module.scss';

interface IProps extends IComponentChild {
  contributor: IContributor;
}

export class AboutContributor extends Component {
  constructor({ className = [], contributor }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.contributor, className);
    super({ className: cssClasses }, ...children);

    const role = new Component({ className: styles.role, text: contributor.userRole });
    const avatar = new Component({
      tag: 'img',
      className: styles.avatar,
      attrs: { src: contributor.avatarUrl },
    });
    const name = new Component({ className: styles.name, text: contributor.username });

    const contributionsTitle = new Component({
      tag: 'span',
      className: styles.contributionsTitle,
      text: messages.titles.contributions,
    });
    const contributionsText = new Component({
      tag: 'span',
      className: styles.contributionsText,
      text: contributor.contributions,
    });

    const line = new Component({ className: styles.line });
    const github = new Component({
      tag: 'a',
      className: styles.github,
      text: messages.titles.github,
      attrs: { href: contributor.githubUrl, target: '_blank', rel: 'noopener noreferrer' },
    });

    const personalInfo = new Component({ className: styles.personalInfo });
    const contributions = new Component({ className: styles.contributions });

    personalInfo.append(role, avatar, name);
    contributions.append(contributionsTitle, contributionsText);
    this.append(personalInfo, contributions, line, github);
  }
}
