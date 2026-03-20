import type { Modal } from './modal.view';
import { RegisterForm } from '../register-form/register-form.view';
import { RegisterFormController } from '@/pages/auth-page/components/features/register-form/register-form.controller';
import { LoginForm } from '@/pages/auth-page/components/features/login-form/login-form.view';
import { LoginFormController } from '@/pages/auth-page/components/features/login-form/login-form.controller';
import styles from './modal.module.scss';

export class ModalController {
  private view: Modal;
  declare private activeController: RegisterFormController | LoginFormController | null;

  constructor(view: Modal) {
    this.view = view;
    this.initListeners();
    this.showLoginForm();
  }

  public destroy(): void {
    this.activeController = null;
  }

  private initListeners(): void {
    this.view.loginTab.addListener('click', () => {
      this.showLoginForm();
    });

    this.view.registerTab.addListener('click', () => {
      this.showRegisterForm();
    });
  }

  private showLoginForm(): void {
    this.view.loginTab.addClass(styles.tabActive);
    this.view.registerTab.removeClass(styles.tabActive);

    this.activeController = null;
    this.view.formContainer.destroyChildren();

    const loginFormView = new LoginForm({});
    this.activeController = new LoginFormController(loginFormView);
    this.view.formContainer.append(loginFormView);
  }

  private showRegisterForm(): void {
    this.view.registerTab.addClass(styles.tabActive);
    this.view.loginTab.removeClass(styles.tabActive);

    this.activeController = null;
    this.view.formContainer.destroyChildren();

    const registerFormView = new RegisterForm({});
    this.activeController = new RegisterFormController(registerFormView);
    this.view.formContainer.append(registerFormView);
  }
}
