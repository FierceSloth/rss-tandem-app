import styles from './landing-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { Sidebar } from '@/components/layout/sidebar/sidebar.view';

export class LandingPage implements IPage {
  public render(): Component {
    const landing: Component = new Component({ className: [styles.landing, 'pageContainer'] });
    landing.append(new Sidebar({}));
    return landing;
  }

  public destroy(): void {}
}
