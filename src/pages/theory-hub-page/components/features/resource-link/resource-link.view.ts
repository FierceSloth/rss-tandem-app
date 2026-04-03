import type { IComponentChild } from '@common/types/types';
import type { IResourceLinkEntity } from '@/pages/theory-hub-page/common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Card } from '@/components/layout/card/card.view';
import { Component } from '@components/base/component';

import videoIcon from '@assets/svg/resource-icons/video.svg?raw';
import articleIcon from '@assets/svg/resource-icons/article.svg?raw';

import styles from './resource-link.module.scss';
import { createSvgComponent } from '@/common/utils/create-svg.util';

const iconConfig = {
  article: articleIcon,
  video: videoIcon,
};

interface IProps extends IComponentChild {
  data: IResourceLinkEntity;
}

export class ResourceLink extends Card {
  constructor({ className = [], data }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.resourceLink, className);
    super({ tag: 'a', className: cssClasses, glass: false, padding: 'sm' }, ...children);
    this.setAttribute('href', data.url);
    this.setAttribute('target', '_blank');
    this.setAttribute('rel', 'noopener noreferrer');

    const iconContainer = new Component({ className: styles.iconContainer });
    const icon = createSvgComponent(iconConfig[data.type]);
    iconContainer.node.append(icon);

    const textContainer = new Component({ className: styles.textContainer });
    const title = new Component({ className: styles.title, text: data.title });
    const source = new Component({ className: styles.source, text: data.source });
    textContainer.append(title, source);

    this.append(iconContainer, textContainer);
  }
}
