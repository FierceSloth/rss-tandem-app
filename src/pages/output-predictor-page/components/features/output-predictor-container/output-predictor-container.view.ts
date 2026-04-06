import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';
import { CodeEditor } from '@/components/features/code-editor/code-editor.view';
import { StatusBadge } from '@/components/ui/status-badge/status-badge.view';

import styles from './output-predictor-container.module.scss';
import { messages } from '@/pages/output-predictor-page/common/constants/messages';

interface IProps extends IComponentChild {}

export class OutputPredictorEditor extends Component {
  public readonly header: Component;
  public readonly codeEditor: CodeEditor;
  public readonly tag: StatusBadge;
  public readonly status: StatusBadge;

  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.outputPredictorContainer, className);
    super({ className: cssClasses }, ...children);

    this.header = new Component({ className: styles.header });

    const dots = new Component({ className: styles.dots });

    this.tag = new StatusBadge({
      text: messages.labels.executionTagDefault,
      className: styles.executionBadge,
      color: 'gray',
      dot: false,
      animation: 'none',
      capitalize: false,
    });

    this.status = new StatusBadge({
      text: messages.labels.statusRunning,
      className: styles.status,
      color: 'green',
      dot: true,
      animation: 'pulse',
      capitalize: true,
    });

    this.header.append(dots, this.tag, this.status);

    this.codeEditor = new CodeEditor({
      className: styles.editor,
      readOnly: true,
      showLineNumbers: true,
      typeScript: false,
    });

    this.append(this.header, this.codeEditor);
  }

  public setData(tag: string): void {
    this.tag.setText(messages.labels.executionTag(tag));
  }

  public setCode(code: string): void {
    this.codeEditor.setValue(code);
  }

  public destroy(): void {
    this.codeEditor.destroy();
    super.destroy();
  }
}
