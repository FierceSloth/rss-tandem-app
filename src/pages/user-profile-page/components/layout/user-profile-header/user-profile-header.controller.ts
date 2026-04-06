import type { UserProfileHeader } from './user-profile-header.view';
import { ROUTES } from '@/router/constants';
import type { useNavigate } from '@/router/hooks';
import { authService } from '@/service/auth/auth.service';

export class HeaderController {
  private view: UserProfileHeader;
  private navigate: ReturnType<typeof useNavigate>;

  constructor(view: UserProfileHeader, navigate: ReturnType<typeof useNavigate>) {
    this.view = view;
    this.navigate = navigate;
    this.init();
  }

  private init(): void {
    this.initListeners();
  }

  private initListeners(): void {
    this.view.onLoginClick(() => {
      this.navigate(`${ROUTES.AUTH_PAGE}?view=login`);
    });

    this.view.onLogoutClick((): void => {
      void authService.logout().then(() => {
        this.view.updateAuthButtons();
        this.navigate(ROUTES.LANDING_PAGE);
      });
    });
  }
}
