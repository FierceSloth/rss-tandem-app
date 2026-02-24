import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';

import { EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
// import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';

import styles from './code-editor.module.scss';
import { editorSetup } from './code-editor-theme';

interface IProps extends IComponentChild {
  initialCode?: string;
}

export class CodeEditor extends Component {
  private view: EditorView;

  constructor({ className = [], initialCode = '' }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.codeEditor, className);
    super({ className: cssClasses }, ...children);

    const state = EditorState.create({
      doc: initialCode,
      extensions: [basicSetup, javascript(), editorSetup],
    });

    this.view = new EditorView({
      state,
      parent: this.node,
    });
  }

  public destroy(): void {
    if (this.view) {
      this.view.destroy();
    }
    super.destroy();
  }
}
