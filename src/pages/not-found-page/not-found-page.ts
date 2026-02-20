import { messages } from '@/common/constants/messages';
import styles from './not-found-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { layout } from '@/components/layout/layout';

export class NotFoundPage implements IPage {
  public destroy: () => void;

  constructor() {
    this.destroy = (): void => {
      layout.clearRoot();
    };
  }

  public render(): void {
    const notFound: Component = new Component({ className: styles.notFound });
    notFound.setText(messages.titles.notFound);
    layout.root.append(notFound);
  }
}
