import styles from './about-page.module.scss';
import type { IPage } from '@/common/types/types';
import type { Component } from '@/components/base/component';
import { Footer } from '@/components/layout/footer/footer.view';
import { Header } from '@/components/layout/header/header.view';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';
import { AboutHeader } from './components/layout/about-header/about-header.view';
import { AboutContributors } from './components/layout/about-contributors/about-contributors.view';

export class AboutPage implements IPage {
  public render(): Component {
    const root = new PageLayout({
      className: styles.about,
      withSidebar: false,
      header: new Header({}),
      footer: new Footer({}),
    });

    root.append(new AboutHeader({}), new AboutContributors({}));
    return root;
  }

  public destroy(): void {}
}
