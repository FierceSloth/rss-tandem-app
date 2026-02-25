import styles from './landing-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

import { CodeEditor } from '../../components/features/code-editor/code-editor.view';

const initialCode = `import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';

import styles from './test-widget.module.scss';

interface IProps extends IComponentChild {
  title?: string;
  count?: number;
}

export class TestWidget extends Component {
  private counter: number;

  constructor(
    { className = [], title = 'Default title', count = 0 }: IProps,
    ...children: Component[]
  ) {
    const cssClasses = mergeClassNames(styles.widget, className);
    super({ className: cssClasses }, ...children);

    this.counter = count;
    this.render(title);
  }

  private render(title: string): void {
    this.node.textContent = \`\${title}: \${this.counter}\`;
  }

  public increment(): void {
    this.counter += 1;
    this.update();
  }

  private update(): void {
    this.node.textContent = \`Count = \${this.counter}\`;
  }

  public destroy(): void {
    console.log('Widget destroyed');
    super.destroy();
  }
}`;

export class LandingPage implements IPage {
  public render(): Component {
    const landing: Component = new Component({ className: [styles.landing, 'pageContainer'] });
    const codeEditor = new CodeEditor({
      initialCode: initialCode,
    });
    landing.append(codeEditor);

    return landing;
  }

  public destroy(): void {}
}
