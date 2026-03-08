import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';
import { ROUTES } from '@/router/constants';

// `?raw` allows you to import the svg source code rather than a memory reference to it.
import dashboardIcon from '@assets/svg/nav-icons/dashboard.svg?raw';
import roadmapIcon from '@assets/svg/nav-icons/roadmap.svg?raw';
import profileIcon from '@assets/svg/nav-icons/profile.svg?raw';

import styles from './sidebar.module.scss';
import { SidebarController } from './sidebar.controller';
import { createSvgComponent } from '@/common/utils/create-svg.util';

const navConfigs = [
  { path: ROUTES.DASHBOARD_PAGE, icon: dashboardIcon },
  { path: ROUTES.ROADMAP_PAGE, icon: roadmapIcon },
  { path: ROUTES.USER_PROFILE_PAGE, icon: profileIcon },
];

interface IProps extends IComponentChild {
  withController?: boolean;
}

export class Sidebar extends Component {
  public navButtons: Record<string, Component<HTMLButtonElement>> = {};
  private controller: SidebarController | null = null;

  constructor({ className = [], withController = true }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.sidebar, className);
    super({ tag: 'nav', className: cssClasses }, ...children);

    this.renderItems();

    if (withController) {
      this.controller = new SidebarController(this);
    }
  }

  public destroy(): void {
    this.controller?.destroy();
  }

  public setActive(activePath: string): void {
    Object.entries(this.navButtons).forEach(([path, button]) => {
      button.toggleClass(styles.active, activePath.startsWith(path));
    });
  }

  private renderItems(): void {
    navConfigs.forEach(({ path, icon }) => {
      const button = new Component<HTMLButtonElement>({
        tag: 'button',
        className: styles.navItem,
      });
      const svgElement = createSvgComponent(icon);
      button.node.append(svgElement);

      this.navButtons[path] = button;
      this.append(button);
    });
  }
}
