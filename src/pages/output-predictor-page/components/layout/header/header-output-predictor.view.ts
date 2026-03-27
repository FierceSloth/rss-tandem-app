import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';
import { ProgressBar } from '@/components/ui/progress-bar/progress-bar.view';
import { Timer } from '@/components/ui/timer/timer.view';
import { Tag } from '@/components/ui/tag/tag.view';
import { HeaderOutputPredictorController } from './header-output-predictor.contoller';
import { OUTPUT_PREDICTOR_TIMER } from '@/pages/output-predictor-page/common/constants/constants';
import styles from './header-output-predictor.module.scss';

interface IProps extends IComponentChild {
  withController?: boolean;
}

type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export class HeaderOutputPredictor extends Component {
  public readonly timer: Timer;
  private readonly progressBar: ProgressBar;
  private readonly title: Component;
  private readonly difficultyTag: Tag;
  private readonly labelCount: Component;
  private controller?: HeaderOutputPredictorController;

  constructor({ className = [], withController = true }: IProps) {
    const cssClasses = mergeClassNames(styles.header, className);
    super({ className: cssClasses });

    const leftContainer = new Component({ className: styles.leftContainer });

    this.labelCount = new Component({
      tag: 'span',
      className: styles.labelCount,
      text: 'SIMULATION -/-',
    });

    this.title = new Component({
      tag: 'h2',
      className: styles.title,
      text: 'Loading...',
    });

    this.progressBar = new ProgressBar({ className: styles.progressBar });
    leftContainer.append(this.labelCount, this.title, this.progressBar);

    const centerSection = new Component({ className: styles.center });

    const difficultyLabel = new Component({
      tag: 'span',
      className: styles.difficultyLabel,
      text: 'DIFFICULTY',
    });

    this.difficultyTag = new Tag({
      text: '-',
      color: 'red',
      padding: 'sm',
    });

    centerSection.append(difficultyLabel, this.difficultyTag);

    this.timer = new Timer({
      color: 'blue',
      padding: 'sm',
      time: OUTPUT_PREDICTOR_TIMER,
      countdown: true,
    });

    this.append(leftContainer, centerSection, this.timer);

    if (withController) {
      this.controller = new HeaderOutputPredictorController(this);
    }
  }

  public setSimulation(current: number, total: number): void {
    this.labelCount.setText(`SIMULATION ${current}/${total}`);
    this.progressBar.setProgress(current, total);
  }

  public setTitle(text: string): void {
    this.title.setText(text);
  }

  public setDifficulty(difficulty: Difficulty): void {
    this.difficultyTag.setText(difficulty);
  }

  public destroy(): void {
    this.controller?.destroy();
    super.destroy();
  }
}
