import styles from './user-profile-header.module.scss';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { messages } from '@/common/constants/messages';
import { Component } from '@/components/base/component';
import { Button } from '@/components/ui/button/button.view';
import { HeaderController } from './user-profile-header.controller';
import { useNavigate } from '@/router/hooks';
import { UserService } from '@/service/user-service/user.service';

interface IProps extends IComponentChild {
  withController?: boolean;
}

export class UserProfileHeader extends Component {
  private readonly loginButton: Component;
  private readonly logoutButton: Component;
  private readonly authNav: Component;

  constructor({ className = [], withController = true }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.userProfileHeader, className);
    super({ tag: 'header', className: cssClasses }, ...children);
    this.loginButton = new Button({
      className: styles.loginButton,
      text: messages.buttons.logIn,
    });
    this.logoutButton = new Button({
      className: styles.logoutButton,
      text: messages.buttons.logOut,
    });
    this.authNav = new Component({
      className: styles.authNav,
    });

    this.createLayout();

    if (withController) {
      new HeaderController(this, useNavigate());
    }
  }

  public onLoginClick(handler: () => void): void {
    this.loginButton.addListener('click', handler);
  }

  public onLogoutClick(handler: () => void): void {
    this.logoutButton.addListener('click', handler);
  }

  public updateAuthButtons(): void {
    if (!this.authNav) return;

    this.authNav.node.replaceChildren();

    if (UserService.isAuthenticated()) {
      this.authNav.append(this.logoutButton);
    } else {
      this.authNav.append(this.loginButton);
    }
  }

  private createLayout(): void {
    const container: Component = new Component({
      className: styles.container,
    });

    if (UserService.isAuthenticated()) {
      this.authNav.append(this.logoutButton);
    } else {
      this.authNav.append(this.loginButton);
    }

    container.append(this.authNav);
    this.append(container);
  }
}
