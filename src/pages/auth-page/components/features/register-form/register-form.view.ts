import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './register-form.module.scss';
import { Input } from '@/components/ui/input/input.view';
import { Button } from '@/components/ui/button/button.view';
import { messages } from '../../../common/constants/messages';

interface IProps extends IComponentChild {}

export class RegisterForm extends Component {
  public readonly form: Component<HTMLFormElement>;
  public readonly login: Input;
  public readonly email: Input;
  public readonly password: Input;
  public readonly confirmPassword: Input;
  public readonly registerButton: Component<HTMLButtonElement>;

  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.registerForm, className);

    super({ className: cssClasses }, ...children);

    this.form = new Component<HTMLFormElement>({
      tag: 'form',
      className: styles.form,
      attrs: {
        method: 'post',
      },
    });

    this.login = new Input({
      className: styles.input,
      labelText: messages.authLogin.labelText,
      placeholder: messages.authLogin.placeholder,
      id: messages.authLogin.id,
      autofocus: true,
    });

    this.email = new Input({
      className: styles.input,
      type: 'email',
      labelText: messages.authEmail.labelText,
      placeholder: messages.authEmail.placeholder,
      id: messages.authEmail.id,
    });

    this.password = new Input({
      className: styles.input,
      type: 'password',
      labelText: messages.password.labelText,
      placeholder: messages.password.placeholder,
      id: messages.password.id,
    });

    this.confirmPassword = new Input({
      className: styles.input,
      type: 'password',
      labelText: messages.confirmPassword.labelText,
      placeholder: messages.confirmPassword.placeholder,
      id: messages.confirmPassword.id,
    });

    this.registerButton = new Button({
      className: styles.button,
      type: 'submit',
      text: messages.registerButton.text,
      variant: 'primary',
    });

    this.form.append(this.login, this.email, this.password, this.confirmPassword, this.registerButton);

    this.append(this.form);
  }
}
