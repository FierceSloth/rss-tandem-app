type Listener<T> = (state: T) => void;

export class Store<T> {
  private state: T;
  private listeners: Listener<T>[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  public getState(): T {
    return this.state;
  }

  public setState(patch: Partial<T>): void {
    this.state = { ...this.state, ...patch };
    this.listeners.forEach((listener) => listener(this.state));
  }

  public subscribe(subscriber: Listener<T>): () => void {
    this.listeners.push(subscriber);

    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== subscriber);
    };
  }
}
