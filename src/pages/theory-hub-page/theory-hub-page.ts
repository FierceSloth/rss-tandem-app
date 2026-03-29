import styles from './theory-hub-page.module.scss';
import type { IPage } from '@/common/types/types';
import type { Component } from '@/components/base/component';
import type { ITheoryHubEntity } from './common/types/types';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';
import { TheoryHubHeader } from './components/layout/theory-hub-header/theory-hub-header.view';
import { LoaderManager } from '@/common/utils/loader-manager.util';
import { InlineCodeText } from '@/components/ui/inline-code-text/inline-code-text.view';
import { ResourceLink } from './components/features/resource-link/resource-link.view';
import { TheoryHubController } from './theory-hub-page.controller';

export class TheoryHubPage implements IPage {
  private header = new TheoryHubHeader({});
  private root: PageLayout | null = null;
  private loader = new LoaderManager();
  private controller: TheoryHubController | null = null;

  public render(): Component {
    this.header.addClass(styles.hide);
    this.root = new PageLayout({ className: styles.theoryHub, withSidebar: false, header: this.header });
    this.controller = new TheoryHubController(this);
    return this.root;
  }

  public destroy(): void {
    this.controller?.destroy();
  }

  public showLoading(): void {
    this.loader.show('lg', 'green');
  }

  public hideLoading(): void {
    this.loader.hide();
  }

  public renderLayout(entity: ITheoryHubEntity): void {
    this.header.removeClass(styles.hide);
    const description = new InlineCodeText({ text: entity.description });
    this.root?.append(description);
    entity.materials.forEach((resourceData) => {
      const resource = new ResourceLink({ data: resourceData });
      this.root?.append(resource);
    });
  }

  public setReady(): void {
    this.root?.addClass('showAnimation');
  }
}
