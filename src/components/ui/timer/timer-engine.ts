type TimerListener = (timeLeft: number) => void;

const MILLISECONDS_PER_SECOND = 1000;

export class TimerEngine {
  private duration: number;
  private timeLeft: number;
  private startTime = 0;
  private endTime = 0;

  private timerId: number | null = null;

  private tickListeners: TimerListener[] = [];
  private endListeners: (() => void)[] = [];

  constructor(duration: number) {
    this.duration = duration;
    this.timeLeft = duration;
  }

  public start(): void {
    this.startTime = Date.now();
    this.endTime = this.startTime + this.timeLeft * MILLISECONDS_PER_SECOND;

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
    const diff = this.endTime - now;

    this.timeLeft = Math.max(0, Math.ceil(diff / MILLISECONDS_PER_SECOND));

    this.tickListeners.forEach((listener) => listener(this.timeLeft));

    if (this.timeLeft <= 0) {
      this.endListeners.forEach((listener) => listener());
      this.stop();
      return;
    }

    this.timerId = requestAnimationFrame(this.loop);
  };
}
