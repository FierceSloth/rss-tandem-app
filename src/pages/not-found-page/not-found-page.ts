import styles from './not-found-page.module.scss';
import { messages } from '@/common/constants/messages';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';

export class NotFoundPage implements IPage {
  public render(): Component {
    const root = new PageLayout({ className: styles.notFound, withSidebar: false });

    const title = new Component({ tag: 'h1', text: messages.titles.notFound });
    root.append(title);

    return root;
  }

  public destroy(): void {}
}
