import styles from './header.module.scss';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { messages } from '@/common/constants/messages';
import { Component } from '@/components/base/component';
import { Button } from '@/components/ui/button/button.view';
import { HeaderController } from './header.controller';
import { useNavigate } from '@/router/hooks';
import { StatusBadge } from '@/components/ui/status-badge.ts/status-badge.view';
import { EMPTY } from '@/common/constants/constants';

interface IProps extends IComponentChild {}

export class Header extends Component {
  private readonly aboutButton: Component;
  private readonly loginButton: Component;
  private readonly registerButton: Component;
  private readonly logoTitle: Component;

  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.header, className);
    super({ tag: 'header', className: cssClasses }, ...children);
    this.aboutButton = new Button({
      className: styles.aboutButton,
      text: messages.buttons.about,
    });
    this.loginButton = new Button({
      className: styles.loginButton,
      text: messages.buttons.logIn,
    });
    this.registerButton = new Button({
      className: styles.registerButton,
      text: messages.buttons.sighInAndRegister,
      type: 'button',
    });
    this.logoTitle = new Component({
      tag: 'span',
      className: styles.logoTitle,
    });

    this.createLayout();
    new HeaderController(this, useNavigate());
  }

  public onAboutClick(handler: () => void): void {
    this.aboutButton.addListener('click', handler);
  }

  public onLoginClick(handler: () => void): void {
    this.loginButton.addListener('click', handler);
  }

  public onRegisterClick(handler: () => void): void {
    this.registerButton.addListener('click', handler);
  }

  public setLogoTitle(logoTitle: string): void {
    this.logoTitle.setText(logoTitle);
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
    middleNav.append(this.aboutButton);

    const authNav: Component = new Component({
      className: styles.authNav,
    });
    authNav.append(this.loginButton, this.registerButton);

    container.append(logoBadge, middleNav, authNav);
    this.append(container);
  }
}
