import { Component } from '@/components/base/component';
import { Spinner } from '@/components/ui/spinner/spinner.view';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'blue' | 'green' | 'red' | 'orange';

export class LoaderManager {
  private spinnerWrapper: Component | null = null;

  public show(size: SpinnerSize = 'md', variant: SpinnerVariant = 'blue'): void {
    if (this.spinnerWrapper) return;

    const spinner = new Spinner({ size, variant });
    this.spinnerWrapper = new Component({ className: 'globalSpinnerWrapper' }, spinner);

    document.body.append(this.spinnerWrapper.node);
  }

  public hide(): void {
    if (this.spinnerWrapper) {
      this.spinnerWrapper.destroy();
      this.spinnerWrapper = null;
    }
  }
}
