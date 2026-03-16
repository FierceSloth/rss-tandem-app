import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './timer.module.scss';
import { TimerEngine } from './timer-engine';

type Color = 'primary' | 'green' | 'green-dark' | 'blue' | 'gray' | 'red';

type Padding = 'none' | 'sm' | 'md' | 'lg' | 'hg';

interface IProps extends IComponentChild {
  color?: Color;
  icon?: Element;
  padding?: Padding;
  time?: number;
  dangerTimeFrom?: number;
}

const LAST_10_MINUTES = 600;
const SIXTY_SECONDS = 60;
const SIXTY_MINUTES_IN_SEC = 3600;
const PAD = 2;
const INITIAL_TIMER = '--:--';

export class Timer extends Component {
  private timeElement: Component;
  private color: Color;
  private isDanger = false;
  private engine: TimerEngine;
  private dangerTimeFrom: number;

  constructor(
    {
      className = [],
      color = 'primary',
      icon,
      padding = 'none',
      time = SIXTY_SECONDS,
      dangerTimeFrom = LAST_10_MINUTES,
    }: IProps,
    ...children: Component[]
  ) {
    const cssClasses = mergeClassNames(
      styles.timer,
      styles[`color-${color}`],
      className,
      padding && styles[`padding-${padding}`]
    );
    super({ className: cssClasses }, ...children);
    this.color = color;
    this.dangerTimeFrom = dangerTimeFrom;

    this.engine = new TimerEngine(time);

    if (icon) {
      this.node.append(icon);
    }

    this.timeElement = new Component({ tag: 'span', className: styles.time, text: INITIAL_TIMER });
    this.append(this.timeElement);

    this.init();
    this.engine.start();
  }

  public getEngine(): TimerEngine {
    return this.engine;
  }

  private init(): void {
    this.engine.onTick((timeLeft) => {
      if (timeLeft <= this.dangerTimeFrom && !this.isDanger) {
        this.removeClass(styles[`color-${this.color}`]);
        this.addClass(styles['color-red']);
        this.isDanger = true;
      }
      this.timeElement.setText(this.formatSeconds(timeLeft));
    });
  }

  private formatSeconds(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / SIXTY_MINUTES_IN_SEC);
    const remainder = totalSeconds % SIXTY_MINUTES_IN_SEC;

    const minutes = Math.floor(remainder / SIXTY_SECONDS);
    const seconds = remainder % SIXTY_SECONDS;

    return hours ? this.formatTimerWithHours(hours, minutes, seconds) : this.formatTimer(minutes, seconds);
  }

  private formatTimerWithHours(hours: number | string, minutes: number | string, seconds: number | string): string {
    return `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  }

  private formatTimer(minutes: number | string, seconds: number | string): string {
    return `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  }

  private formatTime(time: number | string): string {
    return time.toString().padStart(PAD, '0');
  }
}
