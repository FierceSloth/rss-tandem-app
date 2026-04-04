import type { IComponentChild } from '@common/types/types';
import { Component } from '@components/base/component';
import { Button } from '@/components/ui/button/button.view';
import { createSvgComponent } from '@/common/utils/create-svg.util';

interface IProps extends IComponentChild {
  buttonClass: string;
  textWrapperClass: string;
  nameClass: string;
  descriptionClass: string;
  svgWrapperClass: string;
  iconRaw: string;
}

export class TrueFalseButton extends Button {
  public name: Component;
  public description: Component;

  constructor({ buttonClass, textWrapperClass, nameClass, descriptionClass, svgWrapperClass, iconRaw }: IProps) {
    super({ className: buttonClass, type: 'button', variant: 'ghost' });

    const textWrapper = new Component({ className: textWrapperClass });
    this.name = new Component({ className: nameClass });
    this.description = new Component({ className: descriptionClass });
    textWrapper.append(this.name, this.description);

    const svgWrapper = new Component({ className: svgWrapperClass });
    const svgElement = createSvgComponent(iconRaw);
    svgWrapper.node.append(svgElement);

    this.append(textWrapper, svgWrapper);
  }
}
