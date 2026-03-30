import styles from './score.module.scss';
import type { IScore } from '@/components/features/score/types/types';
import { Component } from '@/components/base/component';
import { Button } from '@/components/ui/button/button.view';
import { messages } from './common/constants/messages';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { ScoreController } from './score.controller';
import { createSvgComponent } from '@/common/utils/create-svg.util';

import starIcon from '@assets/svg/common/star.svg?raw';

interface IProps extends IComponentChild {
  scoreData: IScore;
  withButtons?: boolean;
  withController?: boolean;
}

export class Score extends Component {
  public correct: number;
  public total: number;
  public frameId?: number;
  public cap: Component;
  public stars: Component;
  public resultScore: Component;
  public percentText: Component;
  public progress: Component;
  public message: Component;
  public returnButton: Button;
  public retryButton: Button;

  constructor(
    { scoreData, className = [], withButtons = false, withController = true }: IProps,
    ...children: Component[]
  ) {
    const cssClasses = mergeClassNames(styles.score, className);
    super({ className: cssClasses }, ...children);

    this.correct = scoreData.correct;
    this.total = scoreData.total;

    const title = new Component({
      tag: 'h2',
      className: styles.title,
      text: messages.titles.taskCompleted,
    });

    this.cap = new Component({
      className: styles.cap,
    });

    this.stars = new Component({
      className: styles.stars,
    });

    this.resultScore = new Component({
      className: styles.resultScore,
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

    this.retryButton = new Button({
      type: 'button',
      text: messages.buttons.retry,
      variant: 'ghost',
    });
    this.returnButton = new Button({
      type: 'button',
      text: messages.buttons.return,
      variant: 'primary',
    });

    this.node.scrollIntoView({ behavior: 'smooth', block: 'center' });

    this.append(this.cap, this.stars, title, this.percentText, this.resultScore, bar, this.message);

    if (withButtons) {
      const buttonContainer = new Component({ className: styles.buttonContainer }, this.retryButton, this.returnButton);
      this.append(buttonContainer);
    }

    if (withController) {
      new ScoreController(this);
    }
  }

  public fillStars(starsCount: number): void {
    this.stars.destroyChildren();
    const starNumbers = 3;
    for (let i = 0; i < starNumbers; i += 1) {
      const starCssClasses = [styles.star, i < starsCount ? styles.active : styles.inActive];
      const star = new Component({ className: starCssClasses });
      const svg = createSvgComponent(starIcon);
      star.node.append(svg);

      this.stars.append(star);
    }
  }

  public destroy(): void {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }

    super.destroy();
  }
}
