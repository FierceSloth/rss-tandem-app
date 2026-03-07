import styles from './footer.module.scss';
import { FooterController } from './footer.controller';
import type { IComponentChild } from '@common/types/types';
import { mergeClassNames } from '@common/utils/class-names';
import { Component } from '@components/base/component';
import { StatusBadge } from '@/components/ui/status-badge/status-badge.view';
import { messages } from '@/common/constants/messages';

interface IProps extends IComponentChild {}

export class Footer extends Component {
  private readonly browser: Component;
  private readonly os: Component;
  private readonly ip: Component;

  constructor({ className = [] }: IProps, ...children: Component[]) {
    const cssClasses = mergeClassNames(styles.footer, className);
    super({ tag: 'footer', className: cssClasses }, ...children);
    this.browser = new Component({ tag: 'span', className: styles.browser });
    this.os = new Component({ tag: 'span', className: styles.os });
    this.ip = new Component({ tag: 'span', className: styles.ip });
    this.createLayout();
    new FooterController(this);
  }

  public setBrowser(browser: string): void {
    this.browser.setText(browser);
  }

  public setOs(os: string): void {
    this.os.setText(os);
  }

  public setIp(ip: string): void {
    this.ip.setText(ip);
  }

  public createLayout(): void {
    const container = new Component({
      className: styles.container,
    });

    const systemInfoElement: Component = new Component({
      className: styles.systemInfo,
    });
    systemInfoElement.append(this.browser, this.os, this.ip);

    const systemStatusElement = new Component({
      className: styles.systemStatus,
    });

    const statusBadge: StatusBadge = new StatusBadge({
      text: messages.titles.footerSystemOperational,
      animation: 'pulse',
      dotSize: '6',
      color: 'green-dark',
    });

    systemStatusElement.append(statusBadge);

    container.append(systemInfoElement, systemStatusElement);
    this.append(container);
  }
}
