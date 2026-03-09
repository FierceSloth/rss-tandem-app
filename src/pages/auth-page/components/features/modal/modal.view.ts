import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';

import styles from './modal.module.scss';
import { Card } from '@/components/layout/card/card.view';
import { Button } from '@/components/ui/button/button.view';
import { RegisterFormController } from '../register-form/register-form.controller';

interface IProps extends IComponentChild {}

export class Modal extends Component {
  private formContainer: Component;
  private registerFormController: RegisterFormController;

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
      text: 'TANDEM',
    });

    const label = new Component({
      tag: 'p',
      className: styles.label,
      text: 'system access // developer portal',
    });

    const tabs = new Component({
      tag: 'div',
      className: styles.tabs,
    });

    const loginButton = new Button({
      type: 'submit',
      className: 'btn',
      text: 'Login',
      onClick: (): void => {},
    });

    this.registerFormController = new RegisterFormController();
    const registerFormView = this.registerFormController.getView();

    const registerButton = new Button({
      type: 'submit',
      className: 'btn',
      text: 'Register',
      onClick: (): void => {
        this.formContainer.destroyChildren();
        this.formContainer.append(registerFormView);
      },
    });

    this.formContainer = new Component({
      className: styles.formContainer,
    });

    tabs.append(loginButton, registerButton);
    modal.append(logo, label, tabs, this.formContainer);
    this.append(modal);

    this.formContainer.append(registerFormView);
  }
}
