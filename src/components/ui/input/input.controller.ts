import type { Input } from './input.view';
import styles from './input.module.scss';
import { messages } from '@/common/constants/messages';

export class InputController {
  private view: Input;
  private isPasswordVisible = false;

  constructor(view: Input) {
    this.view = view;

    if (this.view.toggleBtn) {
      this.view.toggleBtn.node.addEventListener('click', () => this.togglePasswordVisibility());
    }
  }

  private togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;

    this.view.setType(this.isPasswordVisible ? 'text' : 'password');

    if (this.view.toggleBtn) {
      this.view.toggleBtn.node.setAttribute(
        'aria-label',
        this.isPasswordVisible ? messages.buttons.hidePassword : messages.buttons.showPassword
      );
    }

    if (this.isPasswordVisible) {
      this.view.toggleBtn?.addClass(styles.visible);
    } else {
      this.view.toggleBtn?.removeClass(styles.visible);
    }
  }
}
