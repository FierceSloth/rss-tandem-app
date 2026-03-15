import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';
import { RoadmapHeader } from './components/layout/roadmap-header/roadmap-header.view';
import { RoadmapPageController } from './roadmap-page.controller';
import { LoaderManager } from '@/common/utils/loader-manager.util';
import { messages } from './common/constants/messages';

import styles from './roadmap-page.module.scss';

export class RoadmapPage implements IPage {
  public readonly timelineContainer: Component;
  public readonly circuitLineProgress: Component;

  private controller: RoadmapPageController | null = null;
  private loader: LoaderManager;

  constructor() {
    this.timelineContainer = new Component({ className: styles.timelineContainer });
    this.circuitLineProgress = new Component({ className: styles.circuitlineProgress });

    this.loader = new LoaderManager();
  }

  public render(): Component {
    const header = new RoadmapHeader({});

    this.controller = new RoadmapPageController(this);

    const root = new PageLayout({ className: styles.roadmap, withSidebar: true, header }, this.timelineContainer);
    return root;
  }

  public showLoading(): void {
    this.loader.show('lg', 'green');
  }

  public hideLoading(): void {
    this.loader.hide();
  }

  public showTimelineSkeleton(): void {
    const circuitLineBg = new Component({ className: styles.circuitlineBg });
    const timelineEnd = new Component({ className: styles.timelineEnd, text: messages.footer.endOfRoadmap });

    this.timelineContainer.append(circuitLineBg, this.circuitLineProgress, timelineEnd);
  }

  public setReady(): void {
    this.timelineContainer.addClass(styles.ready);
  }

  public destroy(): void {
    this.controller?.destroy();
  }
}
