import gold from '@/assets/svg/score/gold.svg?raw';
import silver from '@/assets/svg/score/silver.svg?raw';
import bronze from '@/assets/svg/score/bronze.svg?raw';
import { createSvgComponent } from '@/common/utils/create-svg.util';
import { messages } from './common/constants/messages';
import type { Score } from './score.view';
import { getPercentage, getStarsByPercent } from './common/utils/score.util';
import { BRONZE_SCORE, GOLD_SCORE, SILVER_SCORE } from './common/constants/constants';
import { useNavigate } from '@/router/hooks';
import { ROUTES } from '@/router/constants';

export class ScoreController {
  private view: Score;
  private navigate = useNavigate();

  constructor(view: Score) {
    this.view = view;

    const percent = getPercentage(this.view.correct, this.view.total);

    this.init(percent);
  }

  private init(percent: number): void {
    this.setCapIcon(percent);
    this.setStars(percent);
    this.setResultScore();
    this.setPercentageProgress(percent);
    this.setMessage(percent);
    this.initHandlers();
  }

  private initHandlers(): void {
    this.view.returnButton.addListener('click', () => this.navigate(ROUTES.ROADMAP_PAGE));
    this.view.retryButton.addListener('click', () => location.reload());
  }

  private setCapIcon(percent: number): void {
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
      this.view.cap.node.append(createSvgComponent(medalSvg));
    } else {
      this.view.cap.setText('💡');
    }
  }

  private setStars(percent: number): void {
    const starsCount: number = getStarsByPercent(percent);
    this.view.fillStars(starsCount);
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
