import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';

import styles from './register-form.module.scss';
import { Input } from '@/components/ui/input/input.view';
import { Button } from '@/components/ui/button/button.view';

interface IProps extends IComponentChild {}

export class LoginForm extends Component {
  private form: Component;
  private login: Input;
  private password: Input;
  private button: Button;

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
      labelText: 'Login/email',
      placeholder: 'Enter your login or email',
    });

    this.password = new Input({
      className: styles.input,
      labelText: 'Password',
      placeholder: 'Enter your password',
    });

    this.button = new Button({
      className: styles.button,
      text: 'Login',
      type: 'submit',
      variant: 'primary',
    });

    this.form.append(this.login, this.password, this.button);

    this.append(this.form);
  }
}
