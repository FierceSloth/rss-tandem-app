import styles from './layout.module.scss';
import { Component } from '@components/base/component';

class Layout extends Component<HTMLElement> {
  private static instance: Layout;
  public root: Component;

  private constructor() {
    super({ className: styles.layout, attrs: { id: styles.layout } });
    this.root = new Component({ className: styles.root, attrs: { id: styles.root } });
    this.node.append(this.root.node);
  }

  public static getInstance(): Layout {
    if (!Layout.instance) {
      Layout.instance = new Layout();
    }
    return Layout.instance;
  }

  public clearRoot(): void {
    this.root.destroyChildren();
  }
}

export const layout = Layout.getInstance();
