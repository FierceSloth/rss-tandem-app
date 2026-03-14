import type { ILevelData, ISupabaseModule } from './common/types/types';
import type { Component } from '@/components/base/component';
import type { RoadmapPage } from './roadmap-page';
import { LevelCard } from './components/features/level-card/level-card.view';
import { ModuleSeparator } from './components/ui/module-separator/module-separator.view';
import { supabase } from '@/api/supabase/supabase-client';

const POSITIONS = ['left', 'right', 'center'] as const;

export class RoadmapPageController {
  private view: RoadmapPage;

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
    try {
      const { data, error } = await supabase.from('modules').select(`
        id,
        title,
        levels (
          id,
          title,
          description,
          widget_type,
          difficulty,
          user_level_progress (
            status,
            stars
          )
        )
      `);

      if (error) {
        throw error;
      }

      if (data) {
        this.buildTimeline(data);
        this.updateProgressHeight();
      }
    } catch (error) {
      console.error(error);
    }
  }

  private buildTimeline(modules: ISupabaseModule[]): void {
    let levelCounter = 1;
    let moduleCounter = 1;

    modules.forEach((moduleData) => {
      const separator = new ModuleSeparator({ text: moduleData.title, displayId: String(moduleCounter) });
      this.view.timelineContainer.append(separator);

      moduleData.levels.forEach((level) => {
        const currentPosition = POSITIONS[(levelCounter - 1) % POSITIONS.length];

        const progress = level.user_level_progress?.[0];
        let status = progress?.status ?? 'locked';
        const stars = progress?.stars ?? 0;

        const isFirstLocked = status === 'locked' && levelCounter === 1 && moduleCounter === 1;
        if (isFirstLocked) {
          status = 'active';
        }

        const cardData: ILevelData = {
          id: level.id,
          displayId: levelCounter,
          widgetType: level.widget_type,
          title: level.title,
          description: level.description,
          difficulty: level.difficulty,
          status: status,
          stars: stars,
          position: currentPosition,
        };

        const card = new LevelCard({ data: cardData });
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
}
