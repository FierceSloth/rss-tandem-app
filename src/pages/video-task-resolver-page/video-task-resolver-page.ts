import styles from './video-task-resolver-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

export class VideoTaskResolverPage implements IPage {
  public render(): Component {
    const videoTaskResolver: Component = new Component({ className: [styles.videoTaskResolver, 'pageContainer'] });
    return videoTaskResolver;
  }

  public destroy(): void {}
}
