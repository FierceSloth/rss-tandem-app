import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';
import { ProgressBar } from '@/components/ui/progress-bar/progress-bar.view';
import { Timer } from '@/components/ui/timer/timer.view';
import { Tag } from '@/components/ui/tag/tag.view';

import styles from './header-output-predictor.module.scss';

interface IProps extends IComponentChild {
  simulationCurrent: number;
  simulationTotal: number;
  timeSeconds: number;
  withController?: boolean;
}

export class HeaderOutputPredictor extends Component {
  public readonly timer: Timer;
  private readonly progressBar: ProgressBar;
  private readonly title: Component;
  private readonly difficultyTag: Tag;
  private readonly simulationTotal: number;

  constructor({ className = [], simulationCurrent, simulationTotal, timeSeconds }: IProps) {
    const cssClasses = mergeClassNames(styles.header, className);
    super({ className: cssClasses });

    this.simulationTotal = simulationTotal;

    const leftContainer = new Component({ className: styles.leftContainer });

    const labelCount = new Component({
      tag: 'span',
      className: styles.labelCount,
      text: `SIMULATION ${simulationCurrent}/${simulationTotal}`,
    });

    this.title = new Component({
      tag: 'h2',
      className: styles.title,
      text: '',
    });

    this.progressBar = new ProgressBar({ className: styles.progressBar });
    this.progressBar.setProgress(simulationCurrent, simulationTotal);

    leftContainer.append(labelCount, this.title, this.progressBar);

    const centerSection = new Component({ className: styles.center });

    this.difficultyTag = new Tag({
      text: 'Medium',
      color: 'red',
      padding: 'sm',
    });

    centerSection.append(this.difficultyTag);

    this.timer = new Timer({
      color: 'blue',
      padding: 'sm',
      time: timeSeconds,
      countdown: true,
    });

    this.append(leftContainer, centerSection, this.timer);
  }

  public setProgress(current: number): void {
    this.progressBar.setProgress(current, this.simulationTotal);
  }

  public setTitle(text: string): void {
    this.title.setText(text);
  }

  public setDifficulty(difficulty: 'EASY' | 'MEDIUM' | 'HARD'): void {
    this.difficultyTag.setText(difficulty);
  }

  public destroy(): void {
    super.destroy();
  }
}
