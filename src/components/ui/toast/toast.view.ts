import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './toast.module.scss';

export type ToastType = 'success' | 'error' | 'info';

interface IProps extends IComponentChild {
  message: string;
  type?: ToastType;
  duration?: number;
}

const DEFAULT_DURATION = 3000;
const HIDE_ANIMATION_DURATION = 300;
const TOAST_CONTAINER_ID = 'ui-toast-container';

export class Toast extends Component {
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    { className = [], message, type = 'info', duration = DEFAULT_DURATION }: IProps,
    ...children: Component[]
  ) {
    const cssClasses = mergeClassNames(styles.toast, styles[type], className);

    super({ className: cssClasses, text: message }, ...children);
    this.node.style.setProperty('--toast-duration', `${duration}ms`);

    const container = this.getOrCreateContainer();
    container.append(this.node);

    this.timeoutId = setTimeout(() => {
      this.close();
    }, duration);

    this.node.addEventListener('click', () => this.close());
  }

  private getOrCreateContainer(): Element {
    let container = document.querySelector(`#${TOAST_CONTAINER_ID}`);

    if (!container) {
      container = document.createElement('div');
      container.id = TOAST_CONTAINER_ID;
      container.className = styles.toastContainer;
      document.body.append(container);
    }

    return container;
  }

  private close(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.node.classList.add(styles.hiding);

    setTimeout(() => {
      this.destroy();
    }, HIDE_ANIMATION_DURATION);
  }
}
