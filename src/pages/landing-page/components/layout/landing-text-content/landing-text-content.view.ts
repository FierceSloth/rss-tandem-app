import styles from './landing-text-content.module.scss';
import { messages } from '@/pages/landing-page/common/constants/messages';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';

interface IProps extends IComponentChild {}

export class LandingTextContent extends Component {
  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.landingTextContent, className);
    super({ className: cssClasses }, ...children);

    const title: Component = new Component({
      tag: 'h1',
      className: styles.title,
      text: messages.titles.layoutTitlePrimary,
    });
    const subTitle: Component = new Component({
      tag: 'span',
      className: styles.subTitle,
      text: messages.titles.layoutTitleSecondary,
    });
    title.append(subTitle);

    const description: Component = new Component({
      tag: 'p',
      className: styles.description,
      text: messages.titles.layoutDescription,
    });

    this.append(title, description);
  }
}
