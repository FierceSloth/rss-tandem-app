export interface IComponent {
  tag?: keyof HTMLElementTagNameMap;
  className?: string | string[];
  text?: string;
  attrs?: Record<string, string>;
}

interface IEmitter<T extends string> {
  on<U>(event: T, listener: (data: U) => void): void;
  off<U>(event: T, listener: (data: U) => void): void;
}

export class Component<T extends HTMLElement = HTMLElement> {
  public readonly node: T;

  private children: Component[] = [];
  private eventUnsubscriptions: (() => void)[] = [];

  constructor(
    { tag = 'div', className = '', text = '', attrs: attributes = {} }: IComponent,
    ...children: Component[]
  ) {
    const node = document.createElement(tag) as T;
    node.textContent = text;
    this.node = node;

    if (className) {
      if (Array.isArray(className)) {
        node.classList.add(...className);
      } else {
        node.className = className;
      }
    }

    Object.entries(attributes).forEach(([key, value]) => {
      node.setAttribute(key, value);
    });

    if (children.length > 0) {
      this.append(...children);
    }
  }

  public setText(text: string): this {
    this.node.textContent = text;
    return this;
  }

  public addClass(className: string): this {
    this.node.classList.add(className);
    return this;
  }

  public removeClass(className: string): this {
    this.node.classList.remove(className);
    return this;
  }

  public toggleClass(className: string, condition?: boolean): this {
    if (condition === undefined) {
      this.node.classList.toggle(className);
    } else {
      this.node.classList.toggle(className, condition);
    }
    return this;
  }

  public setAttribute(attribute: string, value: string): this {
    this.node.setAttribute(attribute, value);
    return this;
  }

  public removeAttribute(attribute: string): this {
    this.node.removeAttribute(attribute);
    return this;
  }

  public append(...children: Component[]): this {
    children.forEach((child) => {
      this.node.append(child.node);
      this.children.push(child);
    });
    return this;
  }

  public destroyChildren(): void {
    this.children.forEach((child) => child.destroy());
    this.node.replaceChildren();
    this.children = [];
  }

  public addListener<K extends keyof HTMLElementEventMap>(
    event: K,
    listener: (this: T, event_: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): this {
    this.node.addEventListener(event, listener as unknown as EventListener, options);
    return this;
  }

  public removeListener<K extends keyof HTMLElementEventMap>(
    event: K,
    listener: (this: T, event_: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): this {
    this.node.removeEventListener(event, listener as unknown as EventListener, options);
    return this;
  }

  public subscribeTo<T, E extends IEmitter<string>>(
    emitter: E,
    event: E extends IEmitter<infer EventType> ? EventType : string,
    listener: (data: T) => void
  ): void {
    emitter.on(event, listener);
    this.eventUnsubscriptions.push(() => {
      emitter.off(event, listener);
    });
  }

  public setDisabled(isDisabled: boolean): void {
    if (isDisabled) {
      this.node.setAttribute('disabled', 'true');
    } else {
      this.node.removeAttribute('disabled');
    }
  }

  public destroy(): void {
    this.node.remove();

    this.eventUnsubscriptions.forEach((cleanup) => cleanup());
    this.destroyChildren();

    this.eventUnsubscriptions = [];
  }
}
