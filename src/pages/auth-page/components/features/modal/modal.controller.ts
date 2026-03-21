import type { Modal } from './modal.view';
import { RegisterForm } from '../register-form/register-form.view';
import { RegisterFormController } from '../register-form/register-form.controller';
import { LoginForm } from '../login-form/login-form.view';
import { LoginFormController } from '../login-form/login-form.controller';
import { ROUTES } from '@/router/constants';
import { useNavigate, useLocation } from '@/router/hooks';
import styles from './modal.module.scss';

export class ModalController {
  private view: Modal;
  private navigate = useNavigate();
  declare private activeController: RegisterFormController | LoginFormController | null;

  constructor(view: Modal) {
    this.view = view;
    this.initListeners();
    this.initFromUrl();
  }

  public destroy(): void {
    this.activeController = null;
  }

  private initFromUrl(): void {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const view = params.get('view');

    if (view === 'register') {
      this.showRegisterForm();
    } else {
      this.showLoginForm();
    }
  }

  private initListeners(): void {
    this.view.loginTab.addListener('click', () => {
      this.navigate(ROUTES.AUTH_PAGE, {}, { view: 'login' }, { replace: true });
      this.showLoginForm();
    });

    this.view.registerTab.addListener('click', () => {
      this.navigate(ROUTES.AUTH_PAGE, {}, { view: 'register' }, { replace: true });
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
