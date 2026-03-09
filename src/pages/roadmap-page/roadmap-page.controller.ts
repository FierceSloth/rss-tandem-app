import type { ILevelData, IRoadmapResponse } from './common/types/types';
import type { Component } from '@/components/base/component';
import type { RoadmapPage } from './roadmap-page';
import { LevelCard } from './components/features/level-card/level-card.view';
import { ModuleSeparator } from './components/ui/module-separator/module-separator.view';
import { MOCK_ROADMAP_DATA } from './roadmap.mock';

const POSITIONS = ['left', 'right', 'center'] as const;

export class RoadmapPageController {
  private view: RoadmapPage;
  private data: IRoadmapResponse;

  private activeCard: Component | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor(view: RoadmapPage) {
    this.view = view;
    this.data = MOCK_ROADMAP_DATA;

    this.buildTimeline();
    this.initObserver();
  }

  public destroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  private buildTimeline(): void {
    let levelCounter = 1;
    let moduleCounter = 1;

    this.data.modules.forEach((moduleData) => {
      const separator = new ModuleSeparator({ text: moduleData.title, displayId: String(moduleCounter) });
      this.view.timelineContainer.append(separator);
      moduleCounter += 1;

      moduleData.levels.forEach((level) => {
        const currentPosition = POSITIONS[(levelCounter - 1) % POSITIONS.length];

        const cardData: ILevelData = {
          id: level.id,
          displayId: levelCounter,
          widgetType: level.widgetType,
          title: level.title,
          description: level.description,
          difficulty: level.difficulty,
          status: level.status,
          stars: level.stars,
          position: currentPosition,
        };

        const card = new LevelCard({ data: cardData });
        this.view.timelineContainer.append(card);

        if (cardData.status === 'active') {
          this.activeCard = card;
        }

        levelCounter += 1;
      });
    });
  }

  private initObserver(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.updateProgressHeight();
    });

    if (this.view.timelineContainer) {
      this.resizeObserver.observe(this.view.timelineContainer.node);
    }
  }

  private updateProgressHeight(): void {
    requestAnimationFrame(() => {
      if (this.activeCard) {
        const half = 2;
        const targetNode = this.activeCard.node;

        const topOffset = targetNode.offsetTop;
        const halfHeight = targetNode.offsetHeight / half;
        const totalHeight = topOffset + halfHeight;

        this.view.circuitLineProgress.node.style.height = `${totalHeight}px`;
      } else {
        this.view.circuitLineProgress.node.style.height = `100%`;
      }
    });
  }
}
