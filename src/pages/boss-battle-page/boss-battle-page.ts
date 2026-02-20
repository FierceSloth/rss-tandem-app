import styles from './boss-battle-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { layout } from '@/components/layout/layout';

export class BossBattlePage implements IPage {
  public destroy: () => void;

  constructor() {
    this.destroy = (): void => {
      layout.clearRoot();
    };
  }

  public render(): void {
    const bossBattle: Component = new Component({ className: styles.bossBattle });
    layout.root.append(bossBattle);
  }
}
