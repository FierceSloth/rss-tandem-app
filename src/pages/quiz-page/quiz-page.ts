import styles from './quiz-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

export class QuizPage implements IPage {
  public render(): Component {
    const quiz: Component = new Component({ className: [styles.quiz, 'pageContainer'] });
    return quiz;
  }

  public destroy(): void {}
}
