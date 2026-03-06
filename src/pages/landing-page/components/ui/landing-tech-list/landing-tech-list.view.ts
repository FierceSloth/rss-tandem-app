import styles from './landing-tech-list.module.scss';
import type { TechVariant } from '@/components/ui/tech-stack/tech-stack.view';
import { TechStack } from '@/components/ui/tech-stack/tech-stack.view';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';

interface IProps extends IComponentChild {}

export class LandingTechList extends Component {
  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.landingTechList, className);
    super({ className: cssClasses }, ...children);

    const stackVariants: TechVariant[] = ['hIcon', 'xIcon', 'genIcon', 'tagIcon'];
    const techItems = stackVariants.map((variant: TechVariant) => new TechStack({ variant }));
    this.append(...techItems);
  }
}
