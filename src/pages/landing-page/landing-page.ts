import styles from './landing-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { PageLayout } from '@/components/layout/page-layout/page-layout.view';
import { Header } from '@/components/layout/header/header.view';
import { Footer } from '@/components/layout/footer/footer.view';
import { LandingButtons } from './components/features/landing-buttons/landing-buttons.view';
import { LandingBadge } from './components/ui/landing-badge/landing-badge.view';
import { LandingTextContent } from './components/ui/landing-text-content/landing-text-content.view';
import { LandingTechList } from './components/ui/landing-tech-list/landing-tech-list.view';
import { LandingCodeEditor } from './components/ui/landing-code-editor/landing-code-editor.view';

export class LandingPage implements IPage {
  private readonly header: Header;
  private readonly footer: Footer;
  private readonly mainContent: Component;
  private readonly mainDescription: Component;
  private readonly codeEditor: Component;

  constructor() {
    this.header = new Header({});
    this.footer = new Footer({});
    this.mainContent = new Component({ tag: 'section', className: styles.mainContent });
    this.mainDescription = new Component({ className: styles.mainDescription });
    this.codeEditor = new LandingCodeEditor({});
  }

  public render(): Component {
    const badge: LandingBadge = new LandingBadge({});
    const textContent: LandingTextContent = new LandingTextContent({});
    const buttons: LandingButtons = new LandingButtons({});
    const techList: LandingTechList = new LandingTechList({});
    this.mainDescription.append(badge, textContent, buttons, techList);
    this.mainContent.append(this.mainDescription, this.codeEditor);

    const root = new PageLayout({
      className: styles.landing,
      withSidebar: false,
      header: this.header,
      footer: this.footer,
    });
    root.append(this.mainContent);
    return root;
  }

  public destroy(): void {}
}
