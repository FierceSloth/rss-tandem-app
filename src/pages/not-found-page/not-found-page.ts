import styles from './not-found-page.module.scss';
import { messages } from '@/common/constants/messages';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

export class NotFoundPage implements IPage {
  public render(): Component {
    const notFound: Component = new Component({
      className: [styles.notFound, 'pageContainer'],
      text: messages.titles.notFound,
    });
    return notFound;
  }

  public destroy(): void {}
}
