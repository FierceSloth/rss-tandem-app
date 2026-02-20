import styles from './video-task-resolver-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { layout } from '@/components/layout/layout';

export class VideoTaskResolverPage implements IPage {
  public destroy: () => void;

  constructor() {
    this.destroy = (): void => {
      layout.clearRoot();
    };
  }

  public render(): void {
    const videoTaskResolver: Component = new Component({ className: styles.videoTaskResolver });
    layout.root.append(videoTaskResolver);
  }
}
