import type { IComponentChild, IValidateResult } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';

import styles from './register-form.module.scss';
import { Input } from '@/components/ui/input/input.view';
import { Button } from '@/components/ui/button/button.view';

interface IProps extends IComponentChild {
  onSubmit: () => void;
}

export class RegisterForm extends Component {
  private form: Component<HTMLFormElement>;
  private login: Input;
  private email: Input;
  private password: Input;
  private confirmPassword: Input;
  private registerButton: Button;

  constructor({ className = [], onSubmit }: IProps, ...children: Component[]) {
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

    this.registerButton = new Button({
      className: styles.button,
      text: 'Register',
      type: 'submit',
      variant: 'primary',
      onClick: (event): void => {
        event.preventDefault();
        onSubmit();
      },
    });

    this.form.append(this.login, this.email, this.password, this.confirmPassword, this.registerButton);

    this.append(this.form);
  }

  public getFormData(): {
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
  } {
    return {
      login: this.login.getValue(),
      email: this.email.getValue(),
      password: this.password.getValue(),
      confirmPassword: this.confirmPassword.getValue(),
    };
  }

  public validateLogin(validator: (value: string) => IValidateResult): boolean {
    return this.login.validate(validator);
  }

  public validateEmail(validator: (value: string) => IValidateResult): boolean {
    return this.email.validate(validator);
  }

  public validatePassword(validator: (value: string) => IValidateResult): boolean {
    return this.password.validate(validator);
  }

  public validateConfirmPassword(validator: (value: string) => IValidateResult): boolean {
    return this.confirmPassword.validate(validator);
  }

  public clearLoginError(): void {
    this.login.clearError();
  }
}
