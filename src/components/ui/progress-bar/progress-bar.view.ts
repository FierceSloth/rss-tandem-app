import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './progress-bar.module.scss';
import { messages } from '@/pages/quiz-page/common/constants/messages';
import { formatPercent } from '@/common/utils/format.util';
import { TOTAL_PROGRESS } from '@/common/constants/constants';

interface IProps extends IComponentChild {}

export class ProgressBar extends Component {
  private readonly progressFill: Component;

  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.progressBar, className);
    super({ className: cssClasses }, ...children);

    this.progressFill = new Component({ className: styles.progressFill });
    this.append(this.progressFill);
  }

  public setProgress(currentTaskNumber: number = 0, totalNumberOfTasks: number = 0): void {
    if (totalNumberOfTasks < 0 || currentTaskNumber < 0) {
      throw new Error(messages.errors.taskNumberCannotBeNegative);
    }

    if (totalNumberOfTasks === 0) {
      this.progressFill.node.style.width = formatPercent(0);
      return;
    }

    const progress: number = Math.min((currentTaskNumber / totalNumberOfTasks) * TOTAL_PROGRESS, TOTAL_PROGRESS);

    this.progressFill.node.style.width = formatPercent(progress);
  }
}
