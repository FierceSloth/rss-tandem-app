import styles from './landing-code-editor.module.scss';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';
import { messages } from '@/pages/landing-page/common/constants/messages';
import { CodeEditor } from '@/components/features/code-editor/code-editor.view';
import { initialCode } from '@/pages/landing-page/common/code/initial-code';

interface IProps extends IComponentChild {}

export class LandingCodeEditor extends Component {
  public readonly editor: CodeEditor;

  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.codeEditor, className);
    super({ className: cssClasses }, ...children);
    this.editor = new CodeEditor({
      className: styles.editor,
      initialCode: initialCode,
      readOnly: true,
    });
    const editorPanel = new Component({ className: styles.panelEditor }, this.editor);

    const code = new Component({ className: styles.code });
    code.append(editorPanel);

    const windowHeader = this.createWindowHeader();
    const windowFooter = new Component({ className: styles.windowFooter });

    const window = new Component({ className: styles.window });
    window.append(windowHeader, code, windowFooter);
    this.append(window);
  }

  private createWindowHeader(): Component {
    const header = new Component({ className: styles.windowHeader });
    const itemQ = new Component({
      tag: 'span',
      className: styles.itemQ,
      text: messages.titles.itemQ,
    });

    const topic = new Component({
      tag: 'span',
      className: styles.topic,
      text: messages.titles.javaScriptArrays,
    });

    const dots: Component = this.createDots();
    header.append(itemQ, topic, dots);

    return header;
  }

  private createDots(): Component {
    const dots = new Component({ className: styles.dots });
    const dotsCount = 3;
    for (let i = 0; i < dotsCount; i++) {
      const dot = new Component({ className: styles.dot });

      dots.append(dot);
    }

    return dots;
  }
}
