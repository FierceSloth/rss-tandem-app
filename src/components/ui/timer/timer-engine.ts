type TimerListener = (timeLeft: number) => void;

const MILLISECONDS_PER_SECOND = 1000;

export class TimerEngine {
  private duration: number;
  private timeLeft: number;
  private startTime = 0;
  private endTime = 0;
  private countdown: boolean;
  private timerId: number | null = null;
  private lastEmittedTime: number | null = null;

  private tickListeners: TimerListener[] = [];
  private endListeners: (() => void)[] = [];

  constructor(duration: number, countdown: boolean = true) {
    this.duration = duration;
    this.timeLeft = countdown ? duration : 0;
    this.countdown = countdown;
  }

  public start(): void {
    this.lastEmittedTime = null;
    this.startTime = Date.now();

    this.endTime = this.countdown
      ? this.startTime + this.timeLeft * MILLISECONDS_PER_SECOND
      : this.startTime + this.duration * MILLISECONDS_PER_SECOND;

    this.loop();
  }

  public pause(): void {
    if (!this.timerId) return;

    cancelAnimationFrame(this.timerId);
    this.timerId = null;

    this.timeLeft = Math.ceil((this.endTime - Date.now()) / MILLISECONDS_PER_SECOND);
  }

  public resume(): void {
    this.start();
  }

  public reset(): void {
    this.lastEmittedTime = null;
    this.stop();
    this.timeLeft = this.duration;
  }

  public stop(): void {
    if (this.timerId) {
      cancelAnimationFrame(this.timerId);
      this.timerId = null;
    }
  }

  public onTick(listener: TimerListener): void {
    this.tickListeners.push(listener);
  }

  public onEnd(listener: () => void): void {
    this.endListeners.push(listener);
  }

  private loop = (): void => {
    const now = Date.now();
    if (this.countdown) {
      const diff = this.endTime - now;
      this.timeLeft = Math.max(0, Math.ceil(diff / MILLISECONDS_PER_SECOND));
    } else {
      const diff = now - this.startTime;
      this.timeLeft = Math.min(this.duration, Math.floor(diff / MILLISECONDS_PER_SECOND));
    }

    if (this.lastEmittedTime !== this.timeLeft) {
      this.tickListeners.forEach((listener) => listener(this.timeLeft));
      this.lastEmittedTime = this.timeLeft;
    }

    const isFinished = this.countdown ? this.timeLeft <= 0 : this.timeLeft >= this.duration;

    if (isFinished) {
      this.endListeners.forEach((listener) => listener());
      this.stop();
      return;
    }

    this.timerId = requestAnimationFrame(this.loop);
  };
}
