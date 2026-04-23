import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';
import avatarIcon from '@assets/svg/profile/avatar.svg?raw';

import styles from './user-profile.module.scss';
import { Button } from '@/components/ui/button/button.view';
import { createSvgComponent } from '@/common/utils/create-svg.util';
import { Input } from '@/components/ui/input/input.view';
import { UserProfileController } from './user-profile.controller';
import { messages } from '@/pages/user-profile-page/common/constants/messages';

interface IProps extends IComponentChild {
  withController?: boolean;
}

export class UserProfile extends Component {
  public readonly email: Input;
  public readonly username: Input;
  public readonly deleteProfileButton: Button;

  constructor({ className = [], withController = true }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.userProfile, className);
    super({ className: cssClasses }, ...children);

    const primaryPanel = new Component({ className: styles.primaryPanel });
    const avatar = new Component({ className: styles.avatar });

    const secondaryPanel = new Component({ className: styles.secondaryPanel });

    const personalInfo = new Component({ className: styles.personalInfo });
    this.email = new Input({ className: styles.email, labelText: messages.labels.email });
    this.username = new Input({ className: styles.username, labelText: messages.labels.username });

    const buttonWrapper = new Component({ className: styles.buttonWrapper });
    this.deleteProfileButton = new Button({
      className: styles.deleteProfileButton,
      text: messages.buttons.deleteProfile,
      variant: 'ghost',
    });

    avatar.node.append(createSvgComponent(avatarIcon));
    primaryPanel.append(avatar);
    personalInfo.append(this.email, this.username);
    buttonWrapper.append(this.deleteProfileButton);
    secondaryPanel.append(personalInfo, buttonWrapper);
    this.append(primaryPanel, secondaryPanel);

    if (withController) {
      new UserProfileController(this);
    }
  }
}
