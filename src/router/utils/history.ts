import { EMPTY } from '@/common/constants/constants';
import { fullPathWithBaseUrl } from './path';

export function isHistoryState(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    'path' in value &&
    typeof (value as { path: unknown }).path === 'string'
  );
}

export function pushState(path: string): void {
  history.pushState({ path: fullPathWithBaseUrl(path) }, EMPTY, fullPathWithBaseUrl(path));
}
