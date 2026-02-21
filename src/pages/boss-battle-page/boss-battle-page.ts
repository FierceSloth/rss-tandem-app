import styles from './boss-battle-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

export class BossBattlePage implements IPage {
  public render(): Component {
    const bossBattle: Component = new Component({ className: [styles.bossBattle, 'pageContainer'] });
    return bossBattle;
  }

  public destroy(): void {}
}
