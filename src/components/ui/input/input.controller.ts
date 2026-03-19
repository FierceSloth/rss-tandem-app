import type { Input } from './input.view';
import styles from './input.module.scss';

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
    this.view.toggleBtn?.node.setAttribute('aria-label', this.isPasswordVisible ? 'Hide password' : 'Show password');

    if (this.isPasswordVisible) {
      this.view.toggleBtn?.addClass(styles.visible);
    } else {
      this.view.toggleBtn?.removeClass(styles.visible);
    }
  }
}
