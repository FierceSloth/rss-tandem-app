import styles from './quiz-container.module.scss';
import type { IComponentChild, IQuiz, IQuizOption } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';
import { CodeEditor } from '@/components/features/code-editor/code-editor.view';
import { InlineCodeText } from '@/components/ui/inline-code-text/inline-code-text.view';
import { TagList } from '@/pages/quiz-page/components/ui/tag-list/tag-list';
import { AnswerCard } from '@/pages/quiz-page/components/ui/answer-card/answer-card.view';
import { EMPTY } from '@/common/constants/constants';
import { ASCII_A } from '@/pages/quiz-page/common/constants/constants';

interface IProps extends IComponentChild {
  withController?: boolean;
}

export class QuizContainer extends Component {
  public tags: TagList;
  public codeSnippet: CodeEditor;
  public questionText: InlineCodeText;
  public language: Component;
  private answerListElement: Component;
  private answers: AnswerCard[] = [];

  constructor({ className = [], withController = true }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.quizContainer, className);
    super({ className: cssClasses }, ...children);

    const heading = new Component({ className: styles.heading });
    this.tags = new TagList({});
    this.questionText = new InlineCodeText({ tag: 'h2', className: styles.questionText });

    this.codeSnippet = new CodeEditor({
      className: styles.codeSnippet,
      readOnly: true,
    });
    const codeContainer = new Component({ className: styles.codeContainer }, this.codeSnippet);

    this.language = new Component({ className: styles.language });

    this.answerListElement = new Component({ className: styles.answerList });

    heading.append(this.tags, this.questionText);
    codeContainer.append(this.language);
    this.append(heading, codeContainer, this.answerListElement);

    if (withController) {
      //new QuizContainerController(this);
    }
  }

  public setTask(task: IQuiz): void {
    //this.answers.forEach((answer) => answer.reset());

    this.tags.setTags(task.tags ?? []);
    this.questionText.setInlineCodeText(task.question ?? EMPTY);
    this.language.setText(task.language ?? EMPTY);
    this.codeSnippet.setValue(task.codeSnippet ?? EMPTY);

    this.renderAnswers(task.options);
  }

  public checkAnswers(selectedIndex: number): void {
    this.answers.forEach((card, index) => {
      if (index === selectedIndex) {
        card.select();
      }

      if (card.isCorrect) {
        card.markCorrect();
      } else if (index === selectedIndex) {
        card.markIncorrect();
      }
    });
  }

  public addHidden(): void {
    this.addClass(styles.hidden);
  }

  public removeHidden(): void {
    this.removeClass(styles.hidden);
  }

  private renderAnswers(options: IQuizOption[]): void {
    this.answerListElement.destroyChildren();
    this.answers = [];

    options.forEach((option, index) => {
      const answer = new AnswerCard({
        index: index,
        keyHint: String.fromCodePoint(ASCII_A + index),
        answerText: option.text,
        isCorrect: option.isCorrect,
      });
      this.answerListElement.append(answer);
      this.answers.push(answer);
    });
  }
}
