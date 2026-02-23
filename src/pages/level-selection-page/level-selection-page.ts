import styles from './level-selection-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

export class LevelSelectionPage implements IPage {
  public render(): Component {
    const levelsBoard: Component = new Component({ className: [styles.levelsBoard, 'pageContainer'] });
    return levelsBoard;
  }

  public destroy(): void {}
}
