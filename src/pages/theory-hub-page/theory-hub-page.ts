import styles from './theory-hub-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import type { ITheoryHubEntity } from './common/types/types';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';
import { LoaderManager } from '@/common/utils/loader-manager.util';
import { InlineCodeText } from '@/components/ui/inline-code-text/inline-code-text.view';
import { ResourceLink } from './components/features/resource-link/resource-link.view';
import { TheoryHubController } from './theory-hub-page.controller';
import { Card } from '@/components/layout/card/card.view';
import { StatusBadge } from '@/components/ui/status-badge/status-badge.view';
import { messages } from './common/constants/messages';
import { Button } from '@/components/ui/button/button.view';

export class TheoryHubPage implements IPage {
  public backButton = new Button({
    className: [styles.button, styles.backButton],
    variant: 'ghost',
    text: messages.buttons.back,
  });
  public continueButton = new Button({
    className: [styles.button, styles.continueButton],
    variant: 'primary',
    text: messages.buttons.continue,
  });

  private root: PageLayout | null = null;
  private card: Card | null = null;

  private loader = new LoaderManager();
  private controller: TheoryHubController | null = null;

  public render(): Component {
    this.controller = new TheoryHubController(this);

    this.root = new PageLayout({ className: styles.theoryHub, withSidebar: false });
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
    this.card = new Card({ tag: 'section', className: styles.card, glass: false });
    this.root?.append(this.card);

    const cardHeader = new Component({ tag: 'header', className: styles.cardHeader });

    const title = new Component({ tag: 'h1', className: styles.title, text: entity.title });
    const subTitle = new StatusBadge({
      className: styles.subTitle,
      text: messages.titles.subTitle,
      color: 'blue',
      capitalize: true,
      animation: 'pulse-slow',
      dot: false,
    });
    cardHeader.append(subTitle, title);

    const description = new InlineCodeText({ tag: 'p', className: styles.description, text: entity.description });

    const divider = new Component({ className: styles.divider });

    const materialsList = new Component({ className: styles.materialsList });
    const materialTitle = new Component({ className: styles.materialTitle, text: messages.titles.materialTitle });
    materialsList.append(materialTitle);

    entity.materials.forEach((resourceData) => {
      const resource = new ResourceLink({ data: resourceData });
      materialsList.append(resource);
    });

    const buttonContainer = new Component({ className: styles.buttonContainer }, this.backButton, this.continueButton);

    this.card?.append(cardHeader, description, divider, materialsList, buttonContainer);
  }

  public setReady(): void {
    this.card?.addClass(styles.showAnimation);
  }
}
