import styles from './quiz-footer.module.scss';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@/common/utils/class-names.util';
import { Component } from '@components/base/component';
import { Button } from '@/components/ui/button/button.view';
import { createSvgComponent } from '@/common/utils/create-svg.util';
import arrowRightIcon from '@assets/svg/landing-icons/arrow-right-icon.svg?raw';
import { QuizFooterController } from './quiz-footer.controller';

interface IProps extends IComponentChild {
  withController?: boolean;
}

export class QuizFooter extends Component {
  public readonly primaryButton: Button;
  public readonly ghostButton: Button;

  constructor({ className = [], withController = true }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.quizFooter, className);
    super({ className: cssClasses }, ...children);

    this.ghostButton = new Button({
      className: styles.ghostButton,
      type: 'button',
      variant: 'ghost',
    });

    this.primaryButton = new Button({
      className: styles.primaryButton,
      type: 'button',
      variant: 'primary',
    });
    const arrowRightSvgElement = createSvgComponent(arrowRightIcon);
    this.primaryButton.node.append(arrowRightSvgElement);

    this.append(this.ghostButton, this.primaryButton);

    if (withController) {
      new QuizFooterController(this);
    }
  }
}
