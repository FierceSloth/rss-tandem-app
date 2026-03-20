import styles from './score.module.scss';
import type { IScore } from '@/components/features/score/types/types';
import { Component } from '@/components/base/component';
import { messages } from './common/constants/messages';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { ScoreController } from './score.controller';

interface IProps extends IComponentChild {
  scoreData: IScore;
  withController?: boolean;
}

export class Score extends Component {
  public correct: number;
  public total: number;
  public frameId?: number;
  public icon: Component;
  public resultScore: Component;
  public percentText: Component;
  public progress: Component;
  public message: Component;

  constructor({ scoreData, className = [], withController = true }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.score, className);
    super({ className: cssClasses }, ...children);

    this.correct = scoreData.correct;
    this.total = scoreData.total;

    const title = new Component({
      tag: 'h2',
      className: styles.title,
      text: messages.titles.taskCompleted,
    });

    this.icon = new Component({
      className: styles.scoreIcon,
    });

    this.resultScore = new Component({
      className: styles.scoreValue,
    });

    this.percentText = new Component({
      className: styles.percent,
    });

    const bar = new Component({ className: styles.bar });
    this.progress = new Component({
      className: styles.progress,
    });
    bar.append(this.progress);

    this.message = new Component({
      className: styles.message,
    });

    this.node.scrollIntoView({ behavior: 'smooth', block: 'center' });

    this.append(this.icon, title, this.percentText, this.resultScore, bar, this.message);

    if (withController) {
      new ScoreController(this);
    }
  }

  public destroy(): void {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }

    super.destroy();
  }
}
