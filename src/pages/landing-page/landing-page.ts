import styles from './landing-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { Header } from '@/components/layout/header/header.view';
import { Footer } from '@/components/layout/footer/footer.view';
import { useNavigate } from '@/router/hooks';
import { ROUTES } from '@/router/constants';
import { LandingButtons } from './components/ui/landing-buttons/landing-buttons';
import { LandingBadge } from './components/ui/landing-badge/landing-badge';
import { LandingTextContent } from './components/ui/landing-text-content/landing-text-content';
import { LandingTechList } from './components/ui/landing-tech-list/landing-tech-list';
import { LandingCodeEditor } from './components/ui/landing-code-editor/landing-code-editor';

export class LandingPage implements IPage {
  private readonly navigate: ReturnType<typeof useNavigate>;
  private readonly header: Header;
  private readonly footer: Footer;
  private readonly main: Component;
  private readonly mainDescription: Component;
  private readonly codeEditor: Component;

  constructor() {
    this.navigate = useNavigate();
    this.header = new Header({});
    this.footer = new Footer({});
    this.main = new Component({ tag: 'main', className: styles.main });
    this.mainDescription = new Component({ className: styles.mainDescription });
    this.codeEditor = new LandingCodeEditor({});
  }

  public render(): Component {
    const landing: Component = new Component({ className: [styles.landing, 'pageContainer'] });

    const badge: LandingBadge = new LandingBadge({});
    const textContent: LandingTextContent = new LandingTextContent({});
    const buttons: LandingButtons = new LandingButtons({
      onStart: () => this.navigate(ROUTES.LEVEL_SELECTION_PAGE),
      onAbout: () => this.navigate(ROUTES.ABOUT_PAGE),
    });
    const techList: LandingTechList = new LandingTechList({});
    this.mainDescription.append(badge, textContent, buttons, techList);
    this.main.append(this.mainDescription, this.codeEditor);

    landing.append(this.header, this.main, this.footer);
    return landing;
  }

  public destroy(): void {}
}
