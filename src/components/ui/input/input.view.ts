import type { IComponentChild, IValidateResult } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';

import styles from './input.module.scss';

interface IProps extends IComponentChild {
  type?: string;
  labelText?: string;
  placeholder?: string;
}

type Validator = (value: string) => IValidateResult;

export class Input extends Component {
  private input: Component<HTMLInputElement>;
  private error: Component;
  private valid = false;

  constructor({ className = [], type = 'text', labelText = '', placeholder = '' }: IProps) {
    const cssClasses = mergeClassNames(styles.container, className);
    super({ className: cssClasses });

    const inputAttributes = {
      type,
      placeholder,
    };

    if (labelText) {
      const label = new Component<HTMLLabelElement>({ tag: 'label', className: styles.label, text: labelText });
      this.append(label);
    }

    this.input = new Component<HTMLInputElement>({ tag: 'input', className: styles.input, attrs: inputAttributes });

    this.error = new Component({ className: styles.errorText });

    this.append(this.input, this.error);
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

  public isValid(): boolean {
    return this.valid;
  }
}
