import { messages } from '../../common/constants/messages';
import { loginValidator, registerPasswordValidator, emailValidator } from '../../common/utils/validator';
import type { LoginForm } from './login-form.view';
import { authService } from '@/service/auth/auth.service';
import { useNavigate } from '@/router/hooks';
import { ROUTES } from '@/router/constants';

export class LoginFormController {
  private view: LoginForm;
  private navigate = useNavigate();

  private validationState = {
    loginOrEmail: false,
    password: false,
  };

  constructor(view: LoginForm) {
    this.view = view;
    this.initListeners();
    this.handleButton();
  }

  private initListeners(): void {
    this.view.loginOrEmail.addListener('input', () => {
      this.validationState.loginOrEmail = this.validateLoginOrEmail();
      this.handleButton();
    });

    this.view.password.addListener('input', () => {
      this.validationState.password = this.view.password.validate(registerPasswordValidator);
      this.handleButton();
    });

    this.view.form.addListener('submit', (event) => {
      event.preventDefault();
      void this.handleSubmit();
    });
  }

  private validateLoginOrEmail(): boolean {
    const value = this.view.loginOrEmail.getValue();

    if (value.includes('@')) {
      return this.view.loginOrEmail.validate(emailValidator);
    }

    return this.view.loginOrEmail.validate(loginValidator);
  }

  private handleButton(): void {
    const allValid = Object.values(this.validationState).every(Boolean);
    this.view.loginButton.setDisabled(!allValid);
  }

  private async handleSubmit(): Promise<void> {
    const isLoginOrEmailValid = this.validateLoginOrEmail();
    const isPasswordValid = this.view.password.validate(registerPasswordValidator);

    if (!isLoginOrEmailValid || !isPasswordValid) {
      return;
    }

    this.view.loginButton.setDisabled(true);

    const result = await authService.login(this.view.loginOrEmail.getValue(), this.view.password.getValue());

    if (result.success) {
      await authService.getSession();
      this.navigate(ROUTES.ROADMAP_PAGE);
    } else {
      if (result.error === 'User not found') {
        this.view.loginOrEmail.setError(messages.loginForm.loginOrEmail.errors.notFound);
      } else {
        this.view.password.setError(messages.loginForm.password.errors.incorrect);
        this.view.password.setValue('');
      }

      this.view.loginButton.setDisabled(false);
    }
  }
}
