import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';
import { OutputPredictorEditor } from '@/pages/output-predictor-page/components/features/output-predictor-container/output-predictor-container.view';
import { OutputOptions } from '@/pages/output-predictor-page/components/features/output-options/output-options.view';

import styles from './main-output-predictor.module.scss';
import { messages } from '@/pages/output-predictor-page/common/constants/messages';

interface IProps extends IComponentChild {}

export class MainOutputPredictor extends Component {
  public readonly editor: OutputPredictorEditor;
  public readonly outputOptions: OutputOptions;
  public readonly buttonContainer: Component;
  public readonly skipHint: Component;

  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.main, className);

    super({ className: cssClasses }, ...children);

    this.editor = new OutputPredictorEditor({});

    this.outputOptions = new OutputOptions({
      className: styles.options,
    });

    this.buttonContainer = new Component({ className: styles.buttonContainer });
    this.skipHint = new Component({
      className: styles.skipHint,
      text: messages.labels.skipChallenge,
    });
    this.buttonContainer.append(this.skipHint);

    this.append(this.editor, this.outputOptions, this.buttonContainer);
  }

  public setMeta(tag: string): void {
    this.editor.setData(tag);
  }

  public setCode(code: string): void {
    this.editor.setCode(code);
  }

  public getSkipButton(): Component {
    return this.skipHint;
  }
}
