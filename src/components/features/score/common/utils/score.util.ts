import { TOTAL_PROGRESS } from '@/common/constants/constants';
import { BRONZE_SCORE, GOLD_SCORE, ONE_STAR, SILVER_SCORE, THREE_STARS, TWO_STARS } from '../constants/constants';

export function getStarsByPercent(percent: number): number {
  if (percent >= GOLD_SCORE) return THREE_STARS;
  if (percent >= SILVER_SCORE) return TWO_STARS;
  if (percent > BRONZE_SCORE) return ONE_STAR;
  return 0;
}

export function getPercentage(correct: number = 0, total: number = 0): number {
  const percent = total === 0 ? 0 : Math.round((correct / total) * TOTAL_PROGRESS);
  return percent;
}

export function getStars(correct: number = 0, total: number = 0): number {
  return getStarsByPercent(getPercentage(correct, total));
}
