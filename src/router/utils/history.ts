import { EMPTY } from '@/common/constants/constants';
import { fullPathWithBaseUrl } from './path';
import { NavigationMode } from '@/router/navigation-mode';

export function isHistoryState(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    'path' in value &&
    typeof (value as { path: unknown }).path === 'string'
  );
}

export function updateHistory(path: string, locationState: unknown, mode: NavigationMode): void {
  const fullPath = fullPathWithBaseUrl(path);
  const stateWrapper = { path: fullPath, state: locationState };

  if (mode === NavigationMode.PUSH) {
    history.pushState(stateWrapper, EMPTY, fullPath);
  }

  if (mode === NavigationMode.REPLACE) {
    history.replaceState(stateWrapper, EMPTY, fullPath);
  }
}
