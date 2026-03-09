import { useLocation, useNavigate } from '@/router/hooks';
import type { Sidebar } from './sidebar.view';

export class SidebarController {
  private view: Sidebar;
  private navigate = useNavigate();
  private location = useLocation();

  constructor(view: Sidebar) {
    this.view = view;

    this.initListeners();
    this.initActiveState();
  }
  private initActiveState(): void {
    this.view.setActive(this.location.pathname);
  }

  private initListeners(): void {
    Object.entries(this.view.navButtons).forEach(([path, button]) => {
      button.addListener('click', () => {
        this.navigate(path);
        this.view.setActive(path);
      });
    });
  }
}
