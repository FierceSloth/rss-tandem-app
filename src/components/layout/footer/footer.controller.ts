import { getBrowserInfo } from '@/common/utils/device.util';
import type { Footer } from './footer.view';
import { getIpAddress } from '@/service/ip-service/ip.service';
import { maskIp } from '@/common/utils/ip.util';
import { messages } from '@/common/constants/messages';
import type { SystemInfo } from '@/common/types/types';

export class FooterController {
  private view: Footer;

  constructor(view: Footer) {
    this.view = view;
    this.setSystemInfo();
  }

  private setSystemInfo(): void {
    const { browser, os }: SystemInfo = getBrowserInfo();
    this.setBrowserInfo(browser);
    this.setOsInfo(os);
    void this.setIpInfo();
  }

  private setBrowserInfo(browser: string): void {
    this.view.setBrowser(messages.titles.footerBrowser(browser));
  }

  private setOsInfo(os: string): void {
    this.view.setOs(messages.titles.footerOs(os));
  }

  private async setIpInfo(): Promise<void> {
    this.view.setIp(messages.titles.footerIpAddress(messages.titles.statusLoading));
    try {
      const ip = await getIpAddress();
      const maskedIp = maskIp(ip);
      this.view.setIp(messages.titles.footerIpAddress(maskedIp));
    } catch (error) {
      console.error(messages.errors.errorFetchingIp(error instanceof Error ? error.message : String(error)));
      this.view.setIp(messages.titles.footerIpAddress(messages.titles.statusUnavailable));
    }
  }
}
