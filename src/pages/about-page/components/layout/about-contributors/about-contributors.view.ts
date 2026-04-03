import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names.util';
import { Component } from '@components/base/component';
import { AboutContributorsController } from './about-contributors.controller';
import type { IContributor } from '@/pages/about-page/common/types/types';
import { AboutContributor } from '@/pages/about-page/components/features/about-contributor/about-contributor.view';

import styles from './about-contributors.module.scss';
import { LoaderManager } from '@/common/utils/loader-manager.util';

interface IProps extends IComponentChild {
  withController?: boolean;
}

export class AboutContributors extends Component {
  private loader = new LoaderManager();

  constructor({ className = [], withController = true }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.contributors, className);
    super({ className: cssClasses }, ...children);

    if (withController) {
      new AboutContributorsController(this);
    }
  }

  public buildContributors(contributors: IContributor[]): void {
    contributors.forEach((contributor) => {
      const contributorElement = new AboutContributor({
        contributor: {
          userRole: contributor.userRole,
          avatarUrl: contributor.avatarUrl,
          username: contributor.username,
          contributions: contributor.contributions,
          githubUrl: contributor.githubUrl,
        },
      });
      this.append(contributorElement);
    });
  }

  public showLoading(): void {
    this.loader.show('lg', 'green');
  }

  public hideLoading(): void {
    this.loader.hide();
  }
}
