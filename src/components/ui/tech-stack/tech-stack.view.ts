import styles from './tech-stack.module.scss';
import { Component } from '@components/base/component';
import type { IComponentChild } from '@/common/types/types';
import xIcon from '@assets/svg/landing-icons/x-icon.svg?raw';
import hIcon from '@assets/svg/landing-icons/h-icon.svg?raw';
import tagIcon from '@assets/svg/landing-icons/tag-icon.svg?raw';
import genIcon from '@assets/svg/landing-icons/gen-icon.svg?raw';
import { messages } from '@/pages/landing-page/common/constants/messages';
import { createSvgComponent } from '@/common/utils/create-svg';

interface ITech {
  name: string;
  svg: string;
}

interface IProps extends IComponentChild {
  variant: 'hIcon' | 'xIcon' | 'genIcon' | 'tagIcon';
}

const techNamesAndIcons = new Map<string, ITech>([
  ['hIcon', { name: messages.titles.coreJS, svg: hIcon }],
  ['xIcon', { name: messages.titles.typeScript, svg: xIcon }],
  ['genIcon', { name: messages.titles.algorithms, svg: genIcon }],
  ['tagIcon', { name: messages.titles.systemDesign, svg: tagIcon }],
]);

export class TechStack extends Component {
  constructor({ variant, className = [] }: IProps) {
    super({ className: [...className, styles.techItem] });
    this.createTechStack(variant);
  }

  private createTechStack(variant: string): void {
    const techStack = techNamesAndIcons.get(variant);
    if (techStack) {
      const techItemName: Component = new Component({
        tag: 'span',
        className: [styles.techName, styles[variant]],
        text: techStack.name,
      });
      const icon: SVGSVGElement = createSvgComponent(techStack.svg);
      this.node.append(icon, techItemName.node);
    }
  }
}
