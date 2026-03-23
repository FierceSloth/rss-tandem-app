import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';

import { EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';

import styles from './code-editor.module.scss';
import { editorSetup } from './code-editor-theme';

interface IProps extends IComponentChild {
  initialCode?: string;
  typeScript?: boolean;
  readOnly?: boolean;
  showLineNumbers?: boolean;
  isTransparent?: boolean;
}

export class CodeEditor extends Component {
  private view: EditorView;

  constructor(
    {
      className = [],
      initialCode = '',
      typeScript = true,
      readOnly = false,
      showLineNumbers = true,
      isTransparent = false,
    }: IProps,
    ...children: Component[]
  ) {
    const cssClasses = mergeClassNames(
      styles.codeEditor,
      className,
      !showLineNumbers && styles.hideLines,
      isTransparent && styles.transparent,
      readOnly && styles.readonly
    );
    super({ className: cssClasses }, ...children);

    const editorExtensions = [basicSetup, javascript({ typescript: typeScript }), editorSetup];

    if (readOnly) {
      editorExtensions.push(EditorState.readOnly.of(true), EditorView.editable.of(false));
    }

    const state = EditorState.create({
      doc: initialCode,
      extensions: editorExtensions,
    });

    this.view = new EditorView({
      state,
      parent: this.node,
    });
  }

  public setValue(newCode: string): void {
    this.view.dispatch({
      changes: {
        from: 0,
        to: this.view.state.doc.length,
        insert: newCode,
      },
    });
  }

  public getValue(): string {
    return this.view.state.doc.toString();
  }

  public destroy(): void {
    if (this.view) {
      this.view.destroy();
    }
    super.destroy();
  }
}
