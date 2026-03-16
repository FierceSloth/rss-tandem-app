import { UserService } from '@/service/user-service/user.service';
import { BASE_URL, BASE_URL_WITHOUT_LAST_SLASH, ROOT_URL } from '@/router/utils/path';
import type { INavigationTarget, IRoute } from '@/router/types';
import { ROUTES } from '@/router/constants';

export function normalizePath(pathname: string): string {
  if (!pathname.startsWith(BASE_URL)) {
    return pathname;
  }

  const normalized = pathname.slice(BASE_URL_WITHOUT_LAST_SLASH.length);
  return normalized || ROOT_URL;
}

export function isQueryValid(path: string): boolean {
  return path.indexOf('?') === path.lastIndexOf('?');
}

export function resolveSecurity(route: IRoute): INavigationTarget | null {
  if (route.meta.secured && !UserService.isAuthenticated() && route.path !== ROUTES.AUTH_PAGE) {
    return { to: ROUTES.AUTH_PAGE, options: { replace: true } };
  }

  if (UserService.isAuthenticated() && route.path === ROUTES.AUTH_PAGE) {
    return { to: ROUTES.ROADMAP_PAGE, options: { replace: false } };
  }

  return null;
}
