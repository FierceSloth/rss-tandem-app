import styles from './landing-tech-list.module.scss';
import { TechStack } from '@/components/ui/tech-stack/tech-stack.view';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';

interface IProps extends IComponentChild {}

export class LandingTechList extends Component {
  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.landingTechList, className);
    super({ className: cssClasses }, ...children);

    const coreJs: Component = new TechStack({ variant: 'hIcon' });
    const typeScript: Component = new TechStack({ variant: 'xIcon' });
    const algorithms: Component = new TechStack({ variant: 'genIcon' });
    const systemDesign: Component = new TechStack({ variant: 'tagIcon' });

    this.append(coreJs, typeScript, algorithms, systemDesign);
  }
}
