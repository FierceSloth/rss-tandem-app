import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';

import styles from './register-form.module.scss';
import { Input } from '@/components/ui/input/input.view';
import { Button } from '@/components/ui/button/button.view';

interface IProps extends IComponentChild {}

export class RegisterForm extends Component {
  private form: Component;
  private login: Input;
  private email: Input;
  private password: Input;
  private confirmPassword: Input;
  private authButton: Button;

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
      labelText: 'Login',
      placeholder: 'Enter your login',
    });

    this.email = new Input({
      className: styles.input,
      labelText: 'Email',
      placeholder: 'Enter your email',
    });

    this.password = new Input({
      className: styles.input,
      labelText: 'Password',
      placeholder: 'Enter your password',
    });

    this.confirmPassword = new Input({
      className: styles.input,
      labelText: 'Confirm password',
      placeholder: 'Enter your password',
    });

    this.authButton = new Button({
      className: styles.button,
      text: 'Register',
      type: 'submit',
      variant: 'primary',
    });

    this.form.append(this.login, this.email, this.password, this.confirmPassword, this.authButton);

    this.append(this.form);
  }
}
