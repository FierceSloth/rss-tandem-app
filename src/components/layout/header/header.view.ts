import styles from './header.module.scss';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { messages } from '@/common/constants/messages';
import { Component } from '@/components/base/component';
import { Button } from '@/components/ui/button/button.view';
import { HeaderController } from './header.controller';
import { useNavigate } from '@/router/hooks';
import { StatusBadge } from '@/components/ui/status-badge/status-badge.view';
import { EMPTY } from '@/common/constants/constants';
import { ROUTES } from '@/router/constants';
import { pathnameEqualsRoute } from '@/router/utils/path';
import { UserService } from '@/service/user-service/user.service';

interface IProps extends IComponentChild {
  withController?: boolean;
}

export class Header extends Component {
  private readonly aboutButton: Component;
  private readonly landingButton: Component;
  private readonly loginButton: Component;
  private readonly logoutButton: Component;
  private readonly registerButton: Component;
  private readonly logoTitle: Component;
  private readonly authNav: Component;

  constructor({ className = [], withController = true }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.header, className);
    super({ tag: 'header', className: cssClasses }, ...children);
    this.aboutButton = new Button({
      className: styles.aboutButton,
      text: messages.buttons.about,
    });
    this.landingButton = new Button({
      className: styles.landingButton,
      text: messages.buttons.landing,
    });
    this.loginButton = new Button({
      className: styles.loginButton,
      text: messages.buttons.logIn,
    });
    this.logoutButton = new Button({
      className: styles.logoutButton,
      text: messages.buttons.logOut,
    });
    this.registerButton = new Button({
      className: styles.registerButton,
      text: messages.buttons.signInAndRegister,
      type: 'button',
    });
    this.logoTitle = new Component({
      tag: 'span',
      className: styles.logoTitle,
      text: messages.titles.logoTitle,
    });
    this.authNav = new Component({
      className: styles.authNav,
    });

    this.createLayout();

    if (withController) {
      new HeaderController(this, useNavigate());
    }
  }

  public onAboutClick(handler: () => void): void {
    this.aboutButton.addListener('click', handler);
  }

  public onLandingClick(handler: () => void): void {
    this.landingButton.addListener('click', handler);
  }

  public onLoginClick(handler: () => void): void {
    this.loginButton.addListener('click', handler);
  }

  public onLogoutClick(handler: () => void): void {
    this.logoutButton.addListener('click', handler);
  }

  public onRegisterClick(handler: () => void): void {
    this.registerButton.addListener('click', handler);
  }

  public updateAuthButtons(): void {
    if (!this.authNav) return;

    this.authNav.node.replaceChildren();

    if (UserService.isAuthenticated()) {
      this.authNav.append(this.logoutButton);
    } else {
      this.authNav.append(this.loginButton);
    }
    this.authNav.append(this.registerButton);
  }

  private createLayout(): void {
    const container: Component = new Component({
      className: styles.container,
    });

    const logoBadge: Component = new Component({
      className: styles.logoBadge,
    });
    const dotBadge: Component = new StatusBadge({
      color: 'primary',
      animation: 'none',
      text: EMPTY,
    });
    logoBadge.append(dotBadge, this.logoTitle);

    const middleNav: Component = new Component({
      className: styles.middleNav,
    });
    if (pathnameEqualsRoute(ROUTES.ABOUT_PAGE)) {
      middleNav.append(this.landingButton);
    } else {
      middleNav.append(this.aboutButton);
    }

    if (UserService.isAuthenticated()) {
      this.authNav.append(this.logoutButton);
    } else {
      this.authNav.append(this.loginButton);
    }
    this.authNav.append(this.registerButton);

    container.append(logoBadge, middleNav, this.authNav);
    this.append(container);
  }
}
