import styles from './roadmap-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';
import { RoadmapHeader } from './components/layout/roadmap-header/roadmap-header.view';
import { LevelCard } from './components/features/level-card/level-card.view';
import { MOCK_ROADMAP_DATA } from './roadmap.mock';

export class RoadmapPage implements IPage {
  public render(): Component {
    const header = new RoadmapHeader({});

    const timelineContainer = new Component({ className: styles.timelineContainer });

    const circuitLineBg = new Component({ className: styles.circuitLineBg });
    const circuitLineProgress = new Component({ className: styles.circuitLineProgress });

    timelineContainer.append(circuitLineBg, circuitLineProgress);

    MOCK_ROADMAP_DATA.forEach((levelData) => {
      const card = new LevelCard({ data: levelData });
      timelineContainer.append(card);
    });

    const root = new PageLayout({ className: styles.roadmap, withSidebar: true, header }, timelineContainer);
    return root;
  }

  public destroy(): void {}
}
