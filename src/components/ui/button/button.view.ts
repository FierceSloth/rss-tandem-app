import type { IComponentChild } from '@common/types/types';
import { Component } from '@components/base/component';
import styles from './button.module.scss';

type ButtonVariant = 'primary' | 'ghost';

interface IProps extends IComponentChild {
  onClick?: (event: MouseEvent) => void;
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  text?: string;
}

export class Button extends Component<HTMLButtonElement> {
  constructor({ className = [], type = 'button', text = '', variant = 'primary', onClick }: IProps) {
    const cssClasses = [styles.button, styles[variant], ...(Array.isArray(className) ? className : [className])];

    super({ tag: 'button', text, className: cssClasses, attrs: { type } });

    if (typeof onClick === 'function') {
      this.addListener('click', onClick);
    }
  }
}
