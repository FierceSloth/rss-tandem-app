import { useNavigate } from '@/router/hooks';
import type { LandingButtons } from './landing-buttons.view';
import { ROUTES } from '@/router/constants';

export class LandingButtonsController {
  private view: LandingButtons;
  private navigate: ReturnType<typeof useNavigate>;

  constructor(view: LandingButtons) {
    this.view = view;
    this.navigate = useNavigate();

    this.initListeners();
  }

  private initListeners(): void {
    this.view.startButton.addListener('click', this.onStart);
    this.view.aboutButton.addListener('click', this.onAbout);
  }

  private onStart = (): void => {
    this.navigate(ROUTES.ROADMAP_PAGE);
  };

  private onAbout = (): void => {
    this.navigate(ROUTES.ABOUT_PAGE);
  };
}
