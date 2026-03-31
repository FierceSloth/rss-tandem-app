import styles from './true-false-buttons.module.scss';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';
import correctIcon from '@assets/svg/common/correct.svg?raw';
import incorrectIcon from '@assets/svg/common/incorrect.svg?raw';
import { TrueFalseButtonsController } from './true-false-buttons.controller';
import type { ITrueFalseMetadata } from '@/pages/true-false-page/common/types/types';
import { Action } from '@/pages/true-false-page/common/enums/enums';
import { TrueFalseButton } from '@/pages/true-false-page/components/ui/true-false-button/true-false-button';

interface IProps extends IComponentChild {
  withController?: boolean;
}

export class TrueFalseButtons extends Component {
  public readonly verifyButton: TrueFalseButton;
  public readonly rejectButton: TrueFalseButton;
  private controller?: TrueFalseButtonsController;

  constructor({ className = [], withController = true }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.trueFalseButtons, className);
    super({ className: cssClasses }, ...children);

    this.verifyButton = new TrueFalseButton({
      buttonClass: styles.verifyButton,
      textWrapperClass: styles.buttonText,
      nameClass: styles.verifyName,
      descriptionClass: styles.verifyDescription,
      svgWrapperClass: styles.svgWrapper,
      iconRaw: correctIcon,
    });

    this.rejectButton = new TrueFalseButton({
      buttonClass: styles.rejectButton,
      textWrapperClass: styles.buttonText,
      nameClass: styles.rejectName,
      descriptionClass: styles.rejectDescription,
      svgWrapperClass: styles.svgWrapper,
      iconRaw: incorrectIcon,
    });

    this.append(this.verifyButton, this.rejectButton);

    if (withController) {
      this.controller = new TrueFalseButtonsController(this);
    }
  }

  public destroy(): void {
    this.controller?.destroy();
    super.destroy();
  }

  public markCorrect = ({ action, isCorrect }: ITrueFalseMetadata): void => {
    this.resetState();
    const button = action === Action.CONFIRM ? this.verifyButton : this.rejectButton;
    button.addClass(isCorrect ? styles.correct : styles.incorrect);
  };

  public resetState = (): void => {
    this.verifyButton.removeClass(styles.correct);
    this.verifyButton.removeClass(styles.incorrect);
    this.rejectButton.removeClass(styles.correct);
    this.rejectButton.removeClass(styles.incorrect);
  };
}
