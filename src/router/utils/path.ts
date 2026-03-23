export const BASE_URL = import.meta.env.BASE_URL;

export const ROOT_URL = '/';

export const BASE_URL_WITHOUT_LAST_SLASH = BASE_URL.replace(/\/$/, '');

export function fullPathWithBaseUrl(path: string): string {
  return path === ROOT_URL ? `${BASE_URL_WITHOUT_LAST_SLASH}${ROOT_URL}` : `${BASE_URL_WITHOUT_LAST_SLASH}${path}`;
}

export function pathnameEqualsRoute(path: string): boolean {
  return location.pathname === fullPathWithBaseUrl(path);
}

export function pathnameWithParamsEqualsFullPath(fullPath: string): boolean {
  const currentPath = location.pathname;
  const currentQuery = new URLSearchParams(location.search);

  const [targetPathname, targetQuery = ''] = fullPathWithBaseUrl(fullPath).split('?');
  const targetParams = new URLSearchParams(targetQuery);

  if (currentPath !== targetPathname) return false;

  for (const [key, value] of targetParams.entries()) {
    if (currentQuery.get(key) !== value) return false;
  }

  return true;
}
