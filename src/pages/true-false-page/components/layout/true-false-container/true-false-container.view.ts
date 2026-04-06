import styles from './true-false-container.module.scss';
import type { ITrueFalse, ITrueFalseMetadata } from '@/pages/true-false-page/common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';
import { CodeEditor } from '@/components/features/code-editor/code-editor.view';
import { EMPTY, PLACEHOLDER } from '@/common/constants/constants';
import type { IComponentChild } from '@/common/types/types';
import { Tag } from '@/components/ui/tag/tag.view';
import { Card } from '@/components/layout/card/card.view';
import { InlineCodeText } from '@/components/ui/inline-code-text/inline-code-text.view';
import { TrueFalseButtons } from '../true-false-buttons/true-false-buttons.view';
import { trueFalseEmitter } from '@/pages/true-false-page/common/utils/true-false-emmiter.util';
import { Action, TrueFalseEvents } from '@/pages/true-false-page/common/enums/enums';
import { messages } from '@/pages/true-false-page/common/constants/messages';
import { Dots } from '@/components/ui/dots/dots';

interface IProps extends IComponentChild {}

export class TrueFalseContainer extends Component {
  private readonly tag: Tag;
  private readonly codeSnippet: CodeEditor;
  private readonly answerText: InlineCodeText;
  private readonly codeContainer: Component;
  private isCorrect: boolean = false;
  private moduleId: Component;

  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.trueFalseContainer, className);
    super({ className: cssClasses }, ...children);

    this.moduleId = new Component({ tag: 'span', className: styles.id, text: messages.titles.id(PLACEHOLDER) });

    this.tag = new Tag({ className: styles.tag, text: EMPTY, color: 'gray', padding: 'md' });

    this.codeSnippet = new CodeEditor({
      className: styles.codeSnippet,
      isTransparent: true,
      readOnly: true,
      showLineNumbers: false,
    });

    this.answerText = new InlineCodeText({ className: styles.answerText });
    this.codeContainer = new Component({ className: styles.codeContainer }, this.codeSnippet);

    const cardHeader = this.createCardHeader();

    const card = new Card({ tag: 'section', className: styles.card, padding: 'none', glass: true });
    card.append(cardHeader, this.tag, this.codeContainer, this.answerText);

    const trueFalseButtons: TrueFalseButtons = new TrueFalseButtons({});
    this.append(card, trueFalseButtons);
  }

  public setTask(task: ITrueFalse): void {
    this.tag.setText(task.tag ?? EMPTY);
    this.codeSnippet.setValue(task.codeSnippet);
    this.answerText.setInlineCodeText(task.answer);
    this.isCorrect = task.isCorrect;
    this.moduleId.setText(messages.titles.id(task.moduleId ?? PLACEHOLDER));
  }

  public checkAnswer({ action }: ITrueFalseMetadata): boolean {
    const match =
      (action === Action.CONFIRM && this.isCorrect) || (action === Action.DENY && !this.isCorrect) ? true : false;

    trueFalseEmitter.emit(TrueFalseEvents.MARK_ANSWER, { action: action, isCorrect: match });

    return match;
  }

  public addHidden(): void {
    this.addClass(styles.hidden);
  }

  public removeHidden(): void {
    this.removeClass(styles.hidden);
  }

  private createCardHeader(): Component {
    const header = new Component({ className: styles.cardHeader });
    const dots: Component = new Dots({ size: 'hg', colored: false });
    header.append(this.moduleId, dots);

    return header;
  }
}
