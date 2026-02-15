import type { AppEvents } from '@common/types/types';

type Listener<T = unknown> = (data: T) => void;

export class EventEmitter<T extends string> {
  private events: Partial<Record<T, Listener[]>> = {};

  public on<U>(event: T, listener: Listener<U>): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener as Listener);
  }

  public off<U>(event: T, listener: Listener<U>): void {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((l) => l !== (listener as Listener));
  }

  public emit<U>(event: T, data: U): void {
    if (!this.events[event]) return;
    this.events[event].forEach((listener) => listener(data));
  }

  public clear(event?: T): void {
    if (event) {
      this.events[event] = [];
    } else {
      this.events = {};
    }
  }
}

export const appEmitter = new EventEmitter<AppEvents>();
