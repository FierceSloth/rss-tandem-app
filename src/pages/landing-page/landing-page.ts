import styles from './landing-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

import { CodeEditor } from '../../components/features/code-editor/code-editor.view';
import { TerminalLogType } from '@/common/enums/enums';
import { Terminal } from '@/components/features/terminal/terminal.view';

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
      readOnly: true,
      showLineNumbers: true,
    });
    const terminal = new Terminal({});

    landing.append(codeEditor, terminal);

    terminal.print('Initializing connection to engine...', TerminalLogType.SYSTEM);
    terminal.print('Connection established. Port: 8080.', TerminalLogType.DEFAULT);
    terminal.print('Running 4 test cases...', TerminalLogType.SYSTEM);
    terminal.print('Test 1: Array mapping passed.', TerminalLogType.SUCCESS);
    terminal.print('Test 2: Object destructuring passed.', TerminalLogType.SUCCESS);
    terminal.print('TypeError: Cannot read properties of undefined', TerminalLogType.ERROR);
    terminal.print('[ERROR] Timeout: code execution took longer than 3000ms', TerminalLogType.ERROR);
    terminal.print('Session closed.', TerminalLogType.DEFAULT);

    return landing;
  }

  public destroy(): void {}
}
