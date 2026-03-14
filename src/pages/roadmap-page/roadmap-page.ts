import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';
import { RoadmapHeader } from './components/layout/roadmap-header/roadmap-header.view';
import { RoadmapPageController } from './roadmap-page.controller';
import { messages } from './common/constants/messages';

import styles from './roadmap-page.module.scss';
import { Spinner } from '@/components/ui/spinner/spinner.view';

export class RoadmapPage implements IPage {
  public readonly timelineContainer: Component;
  public readonly circuitLineProgress: Component;

  private controller: RoadmapPageController;
  private spinnerWrapper: Component | null = null;

  constructor() {
    this.timelineContainer = new Component({ className: styles.timelineContainer });
    this.circuitLineProgress = new Component({ className: styles.circuitlineProgress });

    this.controller = new RoadmapPageController(this);
  }

  public render(): Component {
    const header = new RoadmapHeader({});

    const root = new PageLayout({ className: styles.roadmap, withSidebar: true, header }, this.timelineContainer);
    return root;
  }

  public showLoading(): void {
    const spinner = new Spinner({ size: 'lg', variant: 'green' });
    this.spinnerWrapper = new Component({ className: styles.spinnerWrapper }, spinner);
    this.timelineContainer.append(this.spinnerWrapper);
  }

  public hideLoading(): void {
    if (this.spinnerWrapper) {
      this.spinnerWrapper.destroy();
      this.spinnerWrapper = null;
    }
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
