import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';
import { ROUTES } from '@/router/constants';

// `?raw` allows you to import the svg source code rather than a memory reference to it.
import dashboardIcon from '@assets/svg/nav-icons/dashboard.svg?raw';
import roadmapIcon from '@assets/svg/nav-icons/roadmap.svg?raw';
import profileIcon from '@assets/svg/nav-icons/profile.svg?raw';

import styles from './sidebar.module.scss';
import { SidebarController } from './sidebar.controller';

const navConfigs = [
  { path: ROUTES.DASHBOARD_PAGE, icon: dashboardIcon },
  { path: ROUTES.LEVEL_SELECTION_PAGE, icon: roadmapIcon },
  { path: ROUTES.USER_PROFILE_PAGE, icon: profileIcon },
];

interface IProps extends IComponentChild {
  withController?: boolean;
}

export class Sidebar extends Component {
  public navButtons: Record<string, Component<HTMLButtonElement>> = {};

  constructor({ className = [], withController = true }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.sidebar, className);
    super({ tag: 'nav', className: cssClasses }, ...children);

    this.renderItems();

    if (withController) {
      new SidebarController(this);
    }
  }

  public setActive(activePath: string): void {
    Object.entries(this.navButtons).forEach(([path, button]) => {
      button.toggleClass(styles.active, activePath === path);
    });
  }

  private renderItems(): void {
    navConfigs.forEach(({ path, icon }) => {
      const button = new Component<HTMLButtonElement>({
        tag: 'button',
        className: styles.navItem,
      });
      button.node.innerHTML = icon;

      this.navButtons[path] = button;
      this.append(button);
    });
  }
}
