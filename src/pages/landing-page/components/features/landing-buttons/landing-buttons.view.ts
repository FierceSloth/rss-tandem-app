import styles from './landing-buttons.module.scss';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';
import { Button } from '@/components/ui/button/button.view';
import { messages } from '@/pages/landing-page/common/constants/messages';
import { createSvgComponent } from '@/common/utils/create-svg';
import arrowRightIcon from '@assets/svg/landing-icons/arrow-right-icon.svg?raw';
import { LandingButtonsController } from './landing-buttons.controller';

interface IProps extends IComponentChild {
  withController?: boolean;
}

export class LandingButtons extends Component {
  public readonly startButton: Button;
  public readonly aboutButton: Button;

  constructor({ className = [], withController = true }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.landingButtons, className);
    super({ className: cssClasses }, ...children);

    this.startButton = new Button({
      className: styles.startPracticingButton,
      text: messages.buttons.startPracticing,
      type: 'button',
      variant: 'primary',
    });
    const arrowRightSvgElement = createSvgComponent(arrowRightIcon);
    this.startButton.node.append(arrowRightSvgElement);

    this.aboutButton = new Button({
      className: styles.aboutProjectButton,
      text: messages.buttons.aboutProjectButton,
      type: 'button',
      variant: 'ghost',
    });

    this.append(this.startButton, this.aboutButton);

    if (withController) {
      new LandingButtonsController(this);
    }
  }
}
