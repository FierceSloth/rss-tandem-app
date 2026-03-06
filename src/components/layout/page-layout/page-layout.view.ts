import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';

import styles from './page-layout.module.scss';
import { Sidebar } from '../sidebar/sidebar.view';

interface IProps extends IComponentChild {
  withSidebar?: boolean;
  header?: Component;
  footer?: Component;
}

export class PageLayout extends Component {
  private content: Component;

  constructor({ className = [], withSidebar = false, header, footer }: IProps, ...pageContent: Component[]) {
    const pageCssClasses = mergeClassNames(styles.pageLayout, withSidebar ? styles.hasSidebar : styles.noSidebar);
    super({ className: pageCssClasses });

    if (withSidebar) {
      const sidebar = new Sidebar({});
      super.append(sidebar);
    }
    const mainColumn = new Component({ className: styles.mainColumn });

    if (header) {
      mainColumn.append(header);
    }

    const contentCssClasses = mergeClassNames(styles.contentWrapper, className);
    this.content = new Component({ tag: 'main', className: contentCssClasses }, ...pageContent);
    mainColumn.append(this.content);

    if (footer) {
      mainColumn.append(footer);
    }

    super.append(mainColumn);
  }

  public append(...children: Component[]): this {
    this.content.append(...children);
    return this;
  }
}
