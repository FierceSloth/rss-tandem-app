import type { ILevelData, IModuleEntity } from './common/types/types';
import type { Component } from '@/components/base/component';
import type { RoadmapPage } from './roadmap-page';
import { LevelCard } from './components/features/level-card/level-card.view';
import { ModuleSeparator } from './components/ui/module-separator/module-separator.view';
import { Toast } from '@/components/ui/toast/toast.view';
import { messages } from '@/common/constants/messages';
import { useNavigate } from '@/router/hooks';
import { WIDGET_ROUTE_MAP } from './common/constants/widget-routes';
import { roadmapRepository } from './repositories/roadmap.repository';

const POSITIONS = ['left', 'right', 'center'] as const;

export class RoadmapPageController {
  private view: RoadmapPage;
  private navigate = useNavigate();

  private activeCard: Component | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor(view: RoadmapPage) {
    this.view = view;

    this.initObserver();
    void this.loadRoadmap();
  }

  public destroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  private async loadRoadmap(): Promise<void> {
    this.view.showLoading();

    try {
      const entities = await roadmapRepository.fetchModules();

      this.view.hideLoading();

      if (entities && entities.length > 0) {
        this.view.renderTimeline();
        this.buildTimeline(entities);
        this.updateProgressHeight();

        this.view.setReady();
      }
    } catch (error) {
      console.error(messages.errors.failedLoadRoadmap, error);

      new Toast({
        message: messages.errors.failedLoadRoadmap,
        type: 'error',
      });
    }
  }

  private buildTimeline(modules: IModuleEntity[]): void {
    let levelCounter = 1;
    let moduleCounter = 1;

    modules.forEach((moduleData) => {
      const separator = new ModuleSeparator({ text: moduleData.title, displayId: String(moduleCounter) });
      this.view.timelineContainer.append(separator);

      moduleData.levels.forEach((level) => {
        const currentPosition = POSITIONS[(levelCounter - 1) % POSITIONS.length];

        const progress = level.userLevelProgress?.[0];
        let status = progress?.status ?? 'locked';
        const stars = progress?.stars ?? 0;

        const isFirstLocked = status === 'locked' && levelCounter === 1 && moduleCounter === 1;
        if (isFirstLocked) {
          status = 'active';
        }

        const cardData: ILevelData = {
          id: level.id,
          displayId: levelCounter,
          widgetType: level.widgetType,
          title: level.title,
          description: level.description,
          difficulty: level.difficulty,
          status: status,
          stars: stars,
          position: currentPosition,
        };

        const card = new LevelCard({ data: cardData });
        card.cardEl.addListener('click', () => this.handleNavigation(cardData));

        this.view.timelineContainer.append(card);

        if (cardData.status === 'active') {
          this.activeCard = card;
        }

        levelCounter += 1;
      });

      moduleCounter += 1;
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

  private handleNavigation = (data: ILevelData): void => {
    if (data.status === 'locked') return;

    const pageRoute = WIDGET_ROUTE_MAP[data.widgetType];
    this.navigate(pageRoute, { id: data.id });
  };
}
