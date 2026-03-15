import type { IComponentChild } from '@common/types/types';
import type { ILevelData } from '@/pages/roadmap-page/common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';
import { createSvgComponent } from '@/common/utils/create-svg.util';
import { Card } from '@/components/layout/card/card.view';
import { messages } from '@/pages/roadmap-page/common/constants/messages';
import { ID_LENGTH } from '@/pages/roadmap-page/common/constants/constants';
import { addHoverAnimation } from '@/common/utils/hover-animation.util';

import checkIcon from '@assets/svg/roadmap-icons/check-mark.svg?raw';
import playIcon from '@assets/svg/roadmap-icons/play.svg?raw';
import lockIcon from '@assets/svg/roadmap-icons/lock.svg?raw';
import starIcon from '@assets/svg/roadmap-icons/star.svg?raw';
import styles from './level-card.module.scss';

interface IProps extends IComponentChild {
  data: ILevelData;
}

const rawIcon = {
  completed: checkIcon,
  active: playIcon,
  locked: lockIcon,
};

export class LevelCard extends Component {
  public readonly cardEl: Component;
  private data: ILevelData;

  constructor({ className = [], data }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.cardWrapper, styles[data.status], styles[data.position], className);
    super({ className: cssClasses }, ...children);

    this.data = data;

    const lineClasses = mergeClassNames(styles.hLine, styles[`${data.status}`]);
    const horizontalLine = new Component({ className: lineClasses });

    const connectorClasses = mergeClassNames(styles.connector, styles[`${data.status}`]);
    const connector = new Component({ className: connectorClasses });

    this.cardEl = this.buildCardContent();

    this.append(horizontalLine, connector, this.cardEl);
  }

  private buildCardContent(): Component {
    const cardHeader = this.buildCardHeader();
    const cardBody = this.buildCardBody();
    const cardFooter = this.buildCardFooter();

    const card = new Card(
      { className: styles.card, padding: 'md', glass: false, color: 'gray' },
      cardHeader,
      cardBody,
      cardFooter
    );
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    if (this.data.status !== 'locked') {
      addHoverAnimation(card);
    }

    return card;
  }

  private buildCardHeader(): Component {
    const idBadge = new Component({
      className: [styles.idBadge, styles[this.data.status]],
      text: `LVL ${String(this.data.displayId).padStart(ID_LENGTH, '0')}`,
    });
    const statusIcon = new Component({
      className: styles.statusIcon,
    });

    const svg = createSvgComponent(rawIcon[this.data.status]);
    statusIcon.node.append(svg);

    const cardHeader = new Component({ className: styles.cardHeader }, idBadge, statusIcon);
    return cardHeader;
  }

  private buildCardBody(): Component {
    const cardTitle = new Component({
      tag: 'h3',
      className: styles.cardTitle,
      text: this.data.title,
    });
    const cardDescription = new Component({
      tag: 'p',
      className: styles.cardDescription,
      text: this.data.description,
    });

    const cardBody = new Component({ className: styles.cardBody }, cardTitle, cardDescription);
    return cardBody;
  }

  private buildCardFooter(): Component {
    const difficultyText = this.data.difficulty.toUpperCase();

    const difficultyBadge = new Component({
      className: [styles.difficultyBadge, styles[`diff-${this.data.difficulty}`]],
      text: difficultyText,
    });

    let actionElement: Component;

    if (this.data.status === 'completed') {
      actionElement = this.buildStars();
    } else if (this.data.status === 'active') {
      actionElement = new Component({
        tag: 'span',
        className: styles.resumeBtn,
        text: messages.actions.resume,
      });
    } else {
      actionElement = new Component({
        tag: 'span',
        className: styles.lockedText,
        text: messages.actions.locked,
      });
    }
    return new Component({ tag: 'footer', className: styles.cardFooter }, difficultyBadge, actionElement);
  }

  private buildStars(): Component {
    const starNumbers = 3;
    const starRating = new Component({ className: styles.starRating });

    for (let i = 0; i < starNumbers; i += 1) {
      const starCssClasses = [styles.star, i < this.data.stars ? styles.active : styles.inActive];
      const star = new Component({ className: starCssClasses });

      const svg = createSvgComponent(starIcon);
      star.node.append(svg);

      starRating.append(star);
    }

    return starRating;
  }
}
