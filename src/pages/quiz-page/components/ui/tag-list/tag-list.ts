import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';

import styles from './tag-list.module.scss';
import { Tag } from '@/components/ui/tag/tag.view';
interface IProps extends IComponentChild {
  tags?: string[];
}

export class TagList extends Component {
  constructor({ className = [], tags = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.tagList, className);
    super({ className: cssClasses }, ...children);

    this.setTags(tags);
  }

  public setTags(tags: string[]): void {
    this.destroyChildren();
    const tagComponents: Tag[] = tags.map(
      (tag, index) => new Tag({ text: tag, color: index === 0 ? 'blue' : 'gray', padding: 'sm' })
    );

    this.append(...tagComponents);
  }
}
