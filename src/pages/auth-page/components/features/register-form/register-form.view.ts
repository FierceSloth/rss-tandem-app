import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './register-form.module.scss';
import { Input } from '@/components/ui/input/input.view';
import { Button } from '@/components/ui/button/button.view';
import { messages } from '@/pages/auth-page/common/constants/messages';

interface IProps extends IComponentChild {}

export class RegisterForm extends Component<HTMLFormElement> {
  public readonly form: Component<HTMLFormElement>;
  public readonly login: Input;
  public readonly email: Input;
  public readonly password: Input;
  public readonly confirmPassword: Input;
  public readonly registerButton: Component<HTMLButtonElement>;

  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.form, className);

    super({ tag: 'form', className: cssClasses, attrs: { method: 'post' } }, ...children);

    this.form = this;

    this.login = new Input({
      className: styles.input,
      labelText: messages.labels.login,
      placeholder: messages.placeholders.login,
      id: messages.id.login,
      autofocus: true,
    });

    this.email = new Input({
      className: styles.input,
      type: 'email',
      labelText: messages.labels.email,
      placeholder: messages.placeholders.email,
      id: messages.id.email,
    });

    this.password = new Input({
      className: styles.input,
      type: 'password',
      labelText: messages.labels.password,
      placeholder: messages.placeholders.password,
      id: messages.id.password,
    });

    this.confirmPassword = new Input({
      className: styles.input,
      type: 'password',
      labelText: messages.labels.confirmPassword,
      placeholder: messages.placeholders.confirmPassword,
      id: messages.id.confirmPassword,
    });

    this.registerButton = new Button({
      className: styles.button,
      type: 'submit',
      text: messages.buttons.register,
      variant: 'primary',
    });

    this.append(this.login, this.email, this.password, this.confirmPassword, this.registerButton);
  }
}
