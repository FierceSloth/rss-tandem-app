import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';
import { OutputPredictorEditor } from '../../features/output-predictor-container/output-predictor-container.view';
import { OutputOptions } from '../../features/output-options/output-options.view';

import styles from './main.module.scss';

interface IProps extends IComponentChild {}

export class Main extends Component {
  public readonly editor: OutputPredictorEditor;
  public readonly outputOptions: OutputOptions;
  public readonly buttonContainer: Component;

  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.main, className);

    super({ className: cssClasses }, ...children);

    this.editor = new OutputPredictorEditor({});

    this.outputOptions = new OutputOptions({
      className: styles.options,
    });

    this.buttonContainer = new Component({ className: styles.footer });
    const skipHint = new Component({
      className: styles.skipHint,
      text: 'SKIP CHALLENGE [Esc]',
    });
    this.buttonContainer.append(skipHint);

    this.append(this.editor, this.outputOptions, this.buttonContainer);
  }

  public setMeta(tag: string): void {
    this.editor.setData(tag);
  }

  public setCode(code: string): void {
    this.editor.setCode(code);
  }
}
