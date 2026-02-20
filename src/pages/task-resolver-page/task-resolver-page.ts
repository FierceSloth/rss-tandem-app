import styles from './task-resolver-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { layout } from '@/components/layout/layout';

export class TaskResolverPage implements IPage {
  public destroy: () => void;

  constructor() {
    this.destroy = (): void => {
      layout.clearRoot();
    };
  }

  public render(): void {
    const taskResolver: Component = new Component({ className: styles.taskResolver });
    layout.root.append(taskResolver);
  }
}
