import styles from './level-selection-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { layout } from '@/components/layout/layout';

export class LevelSelectionPage implements IPage {
  public destroy: () => void;

  constructor() {
    this.destroy = (): void => {
      layout.clearRoot();
    };
  }

  public render(): void {
    const levelsBoard: Component = new Component({ className: styles.levelsBoard });
    layout.root.append(levelsBoard);
  }
}
