import styles from './true-false-header.module.scss';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';
import { TrueFalseHeaderController } from './true-false-header.controller';
import { Timer } from '@/components/ui/timer/timer.view';
import { messages } from '@/pages/true-false-page/common/constants/messages';
import { ProgressBar } from '@/components/ui/progress-bar/progress-bar.view';
import { PLACEHOLDER, TRUE_FALSE_TIMER } from '@/common/constants/constants';

interface IProps extends IComponentChild {
  withController?: boolean;
}

export class TrueFalseHeader extends Component {
  public readonly timeRemainingText: Component;
  public readonly timer: Timer;
  private readonly progressText: Component;
  private readonly level: Component;
  private readonly levelCurrent: Component;
  private readonly levelTotal: Component;
  private readonly progressBar: ProgressBar;
  private controller?: TrueFalseHeaderController;

  constructor({ className = [], withController = true }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.trueFalseHeader, className);
    super({ className: cssClasses }, ...children);

    const container: Component = new Component({ className: styles.container });

    this.progressBar = new ProgressBar({ className: styles.bar });

    const timeRemainingWrapper = new Component({
      className: styles.timeRemainingWrapper,
    });
    this.timeRemainingText = new Component({
      className: styles.timeRemainingText,
      text: messages.titles.timeRemaining,
    });
    this.timer = new Timer({
      className: styles.timer,
      time: TRUE_FALSE_TIMER,
      divider: ':',
    });
    this.timer.getEngine().pause();
    timeRemainingWrapper.append(this.timeRemainingText, this.timer);

    const progressWrapper = new Component({
      className: styles.progressWrapper,
    });
    this.progressText = new Component({
      className: styles.progressText,
      text: messages.titles.progress,
    });
    this.level = new Component({
      className: styles.level,
    });
    this.levelCurrent = new Component({
      tag: 'span',
      className: styles.levelCurrent,
      text: PLACEHOLDER,
    });
    this.levelTotal = new Component({
      tag: 'span',
      className: styles.levelTotal,
      text: `/${PLACEHOLDER}`,
    });
    this.level.append(this.levelCurrent, this.levelTotal);
    progressWrapper.append(this.progressText, this.level);

    container.append(this.progressBar, timeRemainingWrapper, progressWrapper);
    this.append(container);

    if (withController) {
      new TrueFalseHeaderController(this);
    }
  }

  public setProgress(currentTaskNumber: number, totalNumberOfTasks: number): void {
    this.progressBar.setProgress(currentTaskNumber, totalNumberOfTasks);
  }

  public setLevel(currentTaskNumber: number, totalNumberOfTasks: number): void {
    const pad = 2;
    this.levelCurrent.setText(String(currentTaskNumber).padStart(pad, '0'));
    this.levelTotal.setText(`/${String(totalNumberOfTasks).padStart(pad, '0')}`);
  }

  public destroy(): void {
    this.controller?.destroy();
    super.destroy();
  }
}
