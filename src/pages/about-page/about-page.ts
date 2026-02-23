import styles from './about-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

export class AboutPage implements IPage {
  public render(): Component {
    const about: Component = new Component({ className: [styles.about, 'pageContainer'] });
    return about;
  }

  public destroy(): void {}
}
