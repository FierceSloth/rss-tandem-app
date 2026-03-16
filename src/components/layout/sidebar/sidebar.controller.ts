import { useLocation, useNavigate } from '@/router/hooks';
import type { Sidebar } from './sidebar.view';
import { appEmitter } from '@/common/utils/emitter.util';
import { AppEvents } from '@/common/enums/enums';

export class SidebarController {
  private view: Sidebar;
  private navigate = useNavigate();
  private location = useLocation();

  constructor(view: Sidebar) {
    this.view = view;

    this.initListeners();
    this.initActiveState();
  }

  public destroy(): void {
    appEmitter.off(AppEvents.ROUTE_CHANGED, this.onRouteChanged);
  }

  /* ========================================================================== */
  /*                               Initialization                               */
  /* ========================================================================== */

  private initActiveState(): void {
    this.view.setActive(this.location.pathname);
  }

  private initListeners(): void {
    Object.entries(this.view.navButtons).forEach(([path, button]) => {
      button.addListener('click', () => this.onButtonClick(path));
    });

    appEmitter.on(AppEvents.ROUTE_CHANGED, this.onRouteChanged);
  }

  /* ========================================================================== */
  /*                                  Listeners                                 */
  /* ========================================================================== */

  private onRouteChanged = (path: string): void => {
    this.view.setActive(path);
  };

  private onButtonClick = (path: string): void => {
    this.navigate(path);
  };
}
