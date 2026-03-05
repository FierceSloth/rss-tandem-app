import styles from './landing-buttons.module.scss';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';
import { Button } from '@/components/ui/button/button.view';
import { messages } from '@/pages/landing-page/common/constants/messages';
import { createSvgComponent } from '@/common/utils/create-svg';
import arrowRightIcon from '@assets/svg/landing-icons/arrow-right-icon.svg?raw';

interface IProps extends IComponentChild {
  onStart: () => void;
  onAbout: () => void;
}

export class LandingButtons extends Component {
  constructor({ onStart, onAbout, className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.landingButtons, className);
    super({ className: cssClasses }, ...children);

    const startButton = new Button({
      className: styles.startPracticingButton,
      text: messages.buttons.startPracticing,
      type: 'button',
      variant: 'primary',
    });
    const arriwRightSvgElement = createSvgComponent(arrowRightIcon);
    startButton.node.append(arriwRightSvgElement);

    const aboutButton = new Button({
      className: styles.aboutProjectButton,
      text: messages.buttons.aboutProjectButton,
      type: 'button',
      variant: 'ghost',
    });

    startButton.addListener('click', onStart);
    aboutButton.addListener('click', onAbout);

    this.append(startButton, aboutButton);
  }
}
