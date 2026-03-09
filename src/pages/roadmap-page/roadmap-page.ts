import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';
import { RoadmapHeader } from './components/layout/roadmap-header/roadmap-header.view';
import { RoadmapPageController } from './roadmap-page.controller';
import { messages } from './common/constants/messages';

import styles from './roadmap-page.module.scss';

export class RoadmapPage implements IPage {
  public readonly timelineContainer: Component;
  public readonly circuitLineProgress: Component;

  private controller: RoadmapPageController;

  constructor() {
    this.timelineContainer = new Component({ className: styles.timelineContainer });
    this.circuitLineProgress = new Component({ className: styles.circuitlineProgress });

    this.controller = new RoadmapPageController(this);
  }

  public render(): Component {
    const header = new RoadmapHeader({});

    const circuitLineBg = new Component({ className: styles.circuitlineBg });
    const timelineEnd = new Component({ className: styles.timelineEnd, text: messages.footer.endOfRoadmap });

    this.timelineContainer.append(circuitLineBg, this.circuitLineProgress, timelineEnd);

    const root = new PageLayout({ className: styles.roadmap, withSidebar: true, header }, this.timelineContainer);
    return root;
  }

  public destroy(): void {
    this.controller?.destroy();
  }
}
