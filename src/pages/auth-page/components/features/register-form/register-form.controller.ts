import { RegisterForm } from './register-form.view';

const LOGIN_REGEX = /^[a-zA-Z]{1,10}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_ALLOWED_REGEX = /^[A-Za-z0-9]+$/;
const PASSWORD_UPPERCASE_REGEX = /[A-Z]/;
const PASSWORD_DIGIT_REGEX = /\d/;
const PASSWORD_MIN_LENGTH = 6;

export class RegisterFormController {
  private form: RegisterForm;

  constructor() {
    this.form = new RegisterForm({
      onSubmit: (): void => {
        this.handleSubmit();
      },
    });
  }

  public getView(): RegisterForm {
    return this.form;
  }

  private handleSubmit(): void {
    const isLoginValid = this.validateLogin();
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();

    const data = this.form.getFormData();
    const isConfirmValid = this.validateConfirmPassword(data.password);

    if (!isLoginValid || !isEmailValid || !isPasswordValid || !isConfirmValid) {
      return;
    }

    console.log('register data:', data);
  }

  private validateLogin(): boolean {
    return this.form.validateLogin((value) => {
      if (!value) {
        return {
          isValid: false,
          errorMessage: 'Login is required',
        };
      }

      if (!LOGIN_REGEX.test(value)) {
        return {
          isValid: false,
          errorMessage: 'Login must be 1–10 latin letters only',
        };
      }

      return { isValid: true };
    });
  }

  private validateEmail(): boolean {
    return this.form.validateEmail((value) => {
      if (!value) {
        return {
          isValid: false,
          errorMessage: 'Email is required',
        };
      }

      if (!EMAIL_REGEX.test(value)) {
        return {
          isValid: false,
          errorMessage: 'Email is invalid',
        };
      }

      return { isValid: true };
    });
  }

  private validatePassword(): boolean {
    return this.form.validatePassword((value) => {
      if (!value) {
        return {
          isValid: false,
          errorMessage: 'Password is required',
        };
      }

      if (value.length < PASSWORD_MIN_LENGTH) {
        return {
          isValid: false,
          errorMessage: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
        };
      }

      if (!PASSWORD_ALLOWED_REGEX.test(value)) {
        return {
          isValid: false,
          errorMessage: 'Password must contain only latin letters and digits',
        };
      }

      if (!PASSWORD_UPPERCASE_REGEX.test(value)) {
        return {
          isValid: false,
          errorMessage: 'Password must contain at least one uppercase letter',
        };
      }

      if (!PASSWORD_DIGIT_REGEX.test(value)) {
        return {
          isValid: false,
          errorMessage: 'Password must contain at least one digit',
        };
      }

      return { isValid: true };
    });
  }

  private validateConfirmPassword(password: string): boolean {
    return this.form.validateConfirmPassword((value) => {
      if (!value) {
        return {
          isValid: false,
          errorMessage: 'Please confirm your password',
        };
      }

      if (value !== password) {
        return {
          isValid: false,
          errorMessage: 'Passwords do not match',
        };
      }

      return { isValid: true };
    });
  }
}
