import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './modal.module.scss';
import { Card } from '@/components/layout/card/card.view';
import { Button } from '@/components/ui/button/button.view';
import { messages } from '../../common/constants/messages';

interface IProps extends IComponentChild {}

export class Modal extends Component {
  public readonly formContainer: Component;
  public readonly loginTab: Button;
  public readonly registerTab: Button;

  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.modal, className);

    super({ className: cssClasses }, ...children);

    const modal = new Card({
      tag: 'section',
      className: styles.modal,
      glass: true,
      padding: 'hg',
    });

    const logo = new Component({
      tag: 'h1',
      className: styles.logo,
      text: messages.modal.logo,
    });

    const label = new Component({
      tag: 'p',
      className: styles.label,
      text: messages.modal.label,
    });

    const tabs = new Component({
      tag: 'div',
      className: styles.tabs,
    });

    this.loginTab = new Button({
      type: 'button',
      className: styles.tab,
      text: messages.modal.tabs.login,
    });

    this.registerTab = new Button({
      type: 'button',
      className: styles.tab,
      text: messages.modal.tabs.register,
    });

    this.formContainer = new Component({
      className: styles.formContainer,
    });

    tabs.append(this.loginTab, this.registerTab);
    modal.append(logo, label, tabs, this.formContainer);
    this.append(modal);
  }
}
