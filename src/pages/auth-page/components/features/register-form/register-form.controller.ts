import { loginValidator, registerPasswordValidator, emailValidator } from '../../common/utils/validator';
import { messages } from '../../common/constants/messages';
import { authService } from '@/service/auth/auth.service';
import type { RegisterForm } from './register-form.view';
import { useNavigate } from '@/router/hooks';
import { ROUTES } from '@/router/constants';

export class RegisterFormController {
  private view: RegisterForm;
  private navigate = useNavigate();

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

    this.view.login.addListener('blur', () => {
      void this.checkUsername();
    });

    this.view.email.addListener('input', () => {
      this.validationState.email = this.view.email.validate(emailValidator);
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
      void this.handleSubmit();
    });
  }

  private async checkUsername(): Promise<void> {
    const isValid = this.view.login.validate(loginValidator);

    if (!isValid) {
      return;
    }

    const isTaken = await authService.isUsernameTaken(this.view.login.getValue());

    if (isTaken) {
      this.view.login.setError(messages.authLogin.errors.alreadyTaken);
      this.validationState.login = false;
      this.handleButton();
    }
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

  private async handleSubmit(): Promise<void> {
    const isLoginValid = this.view.login.validate(loginValidator);
    const isEmailValid = this.view.email.validate(emailValidator);
    const isPasswordValid = this.view.password.validate(registerPasswordValidator);
    const isConfirmValid = this.validateConfirmPassword();

    if (!isLoginValid || !isEmailValid || !isPasswordValid || !isConfirmValid) {
      return;
    }

    this.view.registerButton.setDisabled(true);

    const result = await authService.register(
      this.view.login.getValue(),
      this.view.email.getValue(),
      this.view.password.getValue()
    );

    if (result.success) {
      await authService.getSession();
      this.navigate(ROUTES.ROADMAP_PAGE);
    } else {
      this.view.email.setError(result.error ?? 'Registration failed');
      this.view.registerButton.setDisabled(false);
    }
  }
}
