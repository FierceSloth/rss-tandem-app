import type { RegisterForm } from './register-form.view';
import { loginValidator, registerPasswordValidator } from '../../common/utils/validator';

import { messages } from '../../common/constants/messages';

export class RegisterFormController {
  private view: RegisterForm;

  private validationState = {
    login: false,
    email: false,
    password: false,
    confirmPassword: false,
  };

  constructor(view: RegisterForm) {
    this.view = view;
    this.initListeners();
    this.handleButton();
  }

  private initListeners(): void {
    this.view.login.addListener('input', () => {
      this.validationState.login = this.view.login.validate(loginValidator);
      this.handleButton();
    });

    this.view.password.addListener('input', () => {
      this.validationState.password = this.view.password.validate(registerPasswordValidator);
      this.validationState.confirmPassword = this.validateConfirmPassword();
      this.handleButton();
    });

    this.view.confirmPassword.addListener('input', () => {
      this.validationState.confirmPassword = this.validateConfirmPassword();
      this.handleButton();
    });

    this.view.form.addListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmit();
    });
  }

  private validateConfirmPassword(): boolean {
    const password = this.view.password.getValue();
    const confirm = this.view.confirmPassword.getValue();

    if (confirm.length === 0) {
      this.view.confirmPassword.setError(messages.confirmPassword.errors.required);
      return false;
    }

    if (password !== confirm) {
      this.view.confirmPassword.setError(messages.confirmPassword.errors.mismatch);
      return false;
    }

    this.view.confirmPassword.clearError();
    return true;
  }

  private handleButton(): void {
    const allValid = Object.values(this.validationState).every(Boolean);
    this.view.registerButton.setDisabled(!allValid);
  }

  private handleSubmit(): void {
    const isLoginValid = this.view.login.validate(loginValidator);
    const isPasswordValid = this.view.password.validate(registerPasswordValidator);
    const isConfirmValid = this.validateConfirmPassword();

    if (isLoginValid && isPasswordValid && isConfirmValid) {
      const data = {
        login: this.view.login.getValue(),
        password: this.view.password.getValue(),
      };

      console.log('Register data:', data);
    }
  }
}
