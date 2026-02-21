import styles from './task-resolver-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

export class TaskResolverPage implements IPage {
  public render(): Component {
    const taskResolver: Component = new Component({ className: [styles.taskResolver, 'pageContainer'] });
    return taskResolver;
  }

  public destroy(): void {}
}
