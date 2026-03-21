import type { IComponentChild, IValidateResult } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';

import eyeOpenSvg from '@/assets/svg/password-icons/eye.svg?raw';
import eyeClosedSvg from '@/assets/svg/password-icons/eye-off.svg?raw';

import styles from './input.module.scss';
import { InputController } from './input.controller';
import { createSvgComponent } from '@/common/utils/create-svg.util';

interface IProps extends IComponentChild {
  type?: string;
  labelText?: string;
  placeholder?: string;
  id?: string;
  autofocus?: boolean;
}

type Validator = (value: string) => IValidateResult;

export class Input extends Component {
  public readonly toggleBtn: Component<HTMLButtonElement> | null = null;
  public readonly eyeOpen: Component | null = null;
  public readonly eyeClosed: Component | null = null;

  private input: Component<HTMLInputElement>;
  private error: Component;
  private valid = false;

  constructor({ className = [], type = 'text', labelText = '', placeholder = '', id = '', autofocus = false }: IProps) {
    const cssClasses = mergeClassNames(styles.container, className);
    super({ className: cssClasses });

    const inputAttributes: Record<string, string> = {
      type,
      placeholder,
    };

    if (id) inputAttributes.id = id;
    if (autofocus) inputAttributes.autofocus = '';

    if (labelText) {
      const label = new Component<HTMLLabelElement>({
        tag: 'label',
        className: styles.label,
        text: labelText,
        attrs: id ? { for: id } : {},
      });
      this.append(label);
    }

    this.input = new Component<HTMLInputElement>({ tag: 'input', className: styles.input, attrs: inputAttributes });

    this.error = new Component({ className: styles.errorText });

    if (type === 'password') {
      this.toggleBtn = new Component<HTMLButtonElement>({
        tag: 'button',
        className: styles.toggleBtn,
        attrs: { type: 'button', 'aria-label': 'Show password' },
      });

      const eyeOpenSvgElement = createSvgComponent(eyeOpenSvg);
      this.eyeOpen = new Component({ className: styles.eyeOpen });
      this.eyeOpen.node.append(eyeOpenSvgElement);

      const eyeClosedSvgElement = createSvgComponent(eyeClosedSvg);
      this.eyeClosed = new Component({ className: styles.eyeClosed });
      this.eyeClosed.node.append(eyeClosedSvgElement);

      this.toggleBtn.append(this.eyeOpen, this.eyeClosed);
      this.append(this.input, this.toggleBtn, this.error);
      new InputController(this);
    } else {
      this.append(this.input, this.error);
    }
  }

  public validate(validator: Validator): boolean {
    const result = validator(this.getValue());

    if (result.isValid) {
      this.clearError();
      this.valid = true;
    } else {
      this.setError(result.errorMessage || '');
      this.valid = false;
    }
    return this.valid;
  }

  public getValue(): string {
    return this.input.node.value;
  }

  public setValue(value: string): void {
    this.input.node.value = value;
  }

  public setError(message: string): void {
    this.addClass(styles.error);
    this.error.setText(message);
  }

  public clearError(): void {
    this.removeClass(styles.error);
    this.error.setText('');
  }

  public setDisabled(isDisabled: boolean): void {
    this.input.setDisabled(isDisabled);
  }

  public setType(type: string): void {
    this.input.node.setAttribute('type', type);
  }

  public isValid(): boolean {
    return this.valid;
  }
}
