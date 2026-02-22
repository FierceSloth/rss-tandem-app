export const BASE_URL = import.meta.env.BASE_URL;

export const ROOT_URL = '/';

export const BASE_URL_WITHOUT_LAST_SLASH = BASE_URL.replace(/\/$/, '');

export function fullPathWithBaseUrl(path: string): string {
  return path === ROOT_URL ? `${BASE_URL_WITHOUT_LAST_SLASH}${ROOT_URL}` : `${BASE_URL_WITHOUT_LAST_SLASH}${path}`;
}

export function pathnameEqualsRoute(path: string): boolean {
  return location.pathname === fullPathWithBaseUrl(path);
}
