import { UAParser } from 'ua-parser-js';
import type { SystemInfo } from '@/common/types/types';

export function getBrowserInfo(): SystemInfo {
  const parser = new UAParser();
  const result = parser.getResult();

  return {
    browser: String(result.browser.name),
    os: String(result.os.name),
  };
}
