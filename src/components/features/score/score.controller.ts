import gold from '@/assets/svg/score/gold.svg?raw';
import silver from '@/assets/svg/score/silver.svg?raw';
import bronze from '@/assets/svg/score/bronze.svg?raw';
import { createSvgComponent } from '@/common/utils/create-svg.util';
import { messages } from './common/constants/messages';
import type { Score } from './score.view';
import { TOTAL_PROGRESS } from '@/common/constants/constants';

const GOLD_SCORE = 80;
const SILVER_SCORE = 50;
const BRONZE_SCORE = 25;

export class ScoreController {
  private view: Score;

  constructor(view: Score) {
    this.view = view;

    const percent = this.view.total === 0 ? 0 : Math.round((this.view.correct / this.view.total) * TOTAL_PROGRESS);

    this.setIcon(percent);
    this.setResultScore();
    this.setPercentageProgress(percent);
    this.setMessage(percent);
  }

  private setIcon(percent: number): void {
    let medalSvg: string | null = null;
    if (percent >= GOLD_SCORE) {
      medalSvg = gold;
    } else if (percent >= SILVER_SCORE) {
      medalSvg = silver;
    } else if (percent >= BRONZE_SCORE) {
      medalSvg = bronze;
    } else {
      medalSvg = null;
    }

    if (medalSvg) {
      this.view.icon.node.append(createSvgComponent(medalSvg));
    } else {
      this.view.icon.setText('💡');
    }
  }

  private setResultScore(): void {
    this.view.resultScore.setText(messages.titles.score(this.view.correct, this.view.total));
  }

  private setPercentageProgress(percent: number): void {
    let current = 0;

    const animate = (): void => {
      if (current < percent) {
        current++;
      }
      this.view.percentText.setText(`${current}%`);
      this.view.progress.node.style.width = `${current}%`;

      if (current >= percent) return;

      this.view.frameId = requestAnimationFrame(animate);
    };

    this.view.frameId = requestAnimationFrame(animate);
  }

  private setMessage(percent: number): void {
    this.view.message.setText(this.getMessage(percent));
  }

  private getMessage(percent: number): string {
    if (percent >= GOLD_SCORE) return messages.messages.perfect;
    if (percent >= SILVER_SCORE) return messages.messages.greatJob;
    if (percent >= BRONZE_SCORE) return messages.messages.notBad;
    return messages.messages.keepLearning;
  }
}
