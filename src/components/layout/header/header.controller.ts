import type { Header } from './header.view';
import { ROUTES } from '@/router/constants';
import type { useNavigate } from '@/router/hooks';

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

    this.view.onLoginClick(() => {
      this.navigate(`${ROUTES.AUTH_PAGE}?view=login`);
    });

    this.view.onRegisterClick(() => {
      this.navigate(`${ROUTES.AUTH_PAGE}?view=register`);
    });
  }
}
