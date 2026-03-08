import styles from './roadmap-page.module.scss';
import type { IPage } from '@/common/types/types';
import type { Component } from '@/components/base/component';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';
import { RoadmapHeader } from './components/layout/roadmap-header/roadmap-header.view';

export class RoadmapPage implements IPage {
  public render(): Component {
    const header = new RoadmapHeader({});

    const root = new PageLayout({ className: styles.roadmap, withSidebar: true, header });
    return root;
  }

  public destroy(): void {}
}
