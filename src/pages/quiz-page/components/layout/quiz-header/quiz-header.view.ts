import styles from './quiz-header.module.scss';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';
import { createSvgComponent } from '@/common/utils/create-svg.util';
import timerIcon from '@assets/svg/common/timer.svg?raw';
import { QuizHeaderController } from './quiz-header.controller';
import { StatusBadge } from '@/components/ui/status-badge/status-badge.view';
import { Timer } from '@/components/ui/timer/timer.view';
import { messages } from '@/pages/quiz-page/common/constants/messages';
import { ProgressBar } from '@/components/ui/progress-bar/progress-bar.view';
import { QUIZ_TIMER } from '@/common/constants/constants';

interface IProps extends IComponentChild {
  withController?: boolean;
}

export class QuizHeader extends Component {
  public readonly timer: Timer;
  private readonly level: StatusBadge;
  private readonly progressBar: ProgressBar;
  private controller?: QuizHeaderController;

  constructor({ className = [], withController = true }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.quizHeader, className);
    super({ className: cssClasses }, ...children);

    this.progressBar = new ProgressBar({});

    this.level = new StatusBadge({
      className: styles.level,
      text: '',
      color: 'blue',
      textColor: 'gray',
      animation: 'none',
    });
    this.level.setText(messages.titles.level('-', '-'));

    const timerSvgElement = createSvgComponent(timerIcon);
    this.timer = new Timer({ icon: timerSvgElement, time: QUIZ_TIMER });
    this.timer.getEngine().pause();

    this.append(this.progressBar, this.level, this.timer);

    if (withController) {
      new QuizHeaderController(this);
    }
  }

  public setProgress(currentTaskNumber: number, totalNumberOfTasks: number): void {
    this.progressBar.setProgress(currentTaskNumber, totalNumberOfTasks);
  }

  public setLevel(currentTaskNumber: number, totalNumberOfTasks: number): void {
    this.level.setText(messages.titles.level(currentTaskNumber, totalNumberOfTasks));
  }

  public destroy(): void {
    this.controller?.destroy();
    super.destroy();
  }
}
