import type { Header } from './header.view';
import { ROUTES } from '@/router/constants';
import type { useNavigate } from '@/router/hooks';
import { authService } from '@/service/auth/auth.service';
import { UserService } from '@/service/user-service/user.service';

export class HeaderController {
  private view: Header;
  private navigate: ReturnType<typeof useNavigate>;

  constructor(view: Header, navigate: ReturnType<typeof useNavigate>) {
    this.view = view;
    this.navigate = navigate;
    this.init();
  }

  private init(): void {
    this.initListeners();
  }

  private initListeners(): void {
    this.view.onAboutClick(() => {
      this.navigate(ROUTES.ABOUT_PAGE);
    });

    this.view.onLandingClick(() => {
      this.navigate(ROUTES.LANDING_PAGE);
    });

    this.view.onLoginClick(() => {
      this.navigate(`${ROUTES.AUTH_PAGE}?view=login`);
    });

    this.view.onLogoutClick((): void => {
      void authService.logout().then(() => {
        this.view.updateAuthButtons();
        this.navigate(ROUTES.LANDING_PAGE);
      });
    });

    this.view.onRegisterClick((): void => {
      if (UserService.isAuthenticated()) {
        void authService.logout().then(() => {
          this.navigate(`${ROUTES.AUTH_PAGE}?view=register`);
        });
      } else {
        this.navigate(`${ROUTES.AUTH_PAGE}?view=register`);
      }
    });
  }
}
