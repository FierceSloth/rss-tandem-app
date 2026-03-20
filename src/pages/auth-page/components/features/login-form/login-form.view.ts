import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './login-form.module.scss';
import { Input } from '@/components/ui/input/input.view';
import { Button } from '@/components/ui/button/button.view';
import { messages } from '@/pages/auth-page/common/constants/messages';

interface IProps extends IComponentChild {}

export class LoginForm extends Component {
  public readonly form: Component<HTMLFormElement>;
  public readonly loginOrEmail: Input;
  public readonly password: Input;
  public readonly loginButton: Button;

  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.loginForm, className);

    super({ className: cssClasses }, ...children);

    this.form = new Component<HTMLFormElement>({
      tag: 'form',
      className: styles.form,
      attrs: {
        method: 'post',
      },
    });

    this.loginOrEmail = new Input({
      className: styles.input,
      labelText: messages.loginForm.loginOrEmail.labelText,
      placeholder: messages.loginForm.loginOrEmail.placeholder,
      id: messages.loginForm.loginOrEmail.id,
      autofocus: true,
    });

    this.password = new Input({
      className: styles.input,
      type: 'password',
      labelText: messages.password.labelText,
      placeholder: messages.password.placeholder,
      id: messages.loginForm.password.id,
    });

    this.loginButton = new Button({
      className: styles.button,
      text: messages.loginForm.button.text,
      type: 'submit',
      variant: 'primary',
    });

    this.loginButton.setDisabled(true);

    this.form.append(this.loginOrEmail, this.password, this.loginButton);
    this.append(this.form);
  }
}
