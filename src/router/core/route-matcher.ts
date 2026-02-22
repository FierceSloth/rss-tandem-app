import type { IRoute } from '@/router/types';

export function matchRouteAndExtractParameters(
  pathname: string,
  routes: IRoute[]
): { route: IRoute; params: Record<string, string> } | null {
  for (const route of routes) {
    const extractedParameters = extractParameters(route.path, pathname);
    if (extractedParameters) {
      return { route, params: extractedParameters };
    }
  }

  return null;
}

/**
 * This method extracts parameters from URL by { :param } key and validate segments
 *
 * @param routePathMatcher IRoute.path as matcher
 * @param locationPathname location.pathname or history state path
 * @returns params or null if page corrupted
 *
 * @example ('/quiz/:id', /quiz/1) => { id: 1 }
 */
export function extractParameters(routePathMatcher: string, locationPathname: string): Record<string, string> | null {
  const routePathSegments: string[] = routePathMatcher.split('/').filter(Boolean);
  const locationPathnameSegments: string[] = locationPathname.split('/').filter(Boolean);
  if (routePathSegments.length !== locationPathnameSegments.length) {
    return null;
  }
  const foundParameters: Record<string, string> = {};

  const isMatch: boolean = routePathSegments.every((segment: string, index: number) => {
    const locationPathnameSegment: string = locationPathnameSegments[index];
    if (segment.startsWith(':')) {
      const key: string = segment.slice(1);
      foundParameters[key] = locationPathnameSegment;
      return true;
    }

    return segment === locationPathnameSegment;
  });
  return isMatch ? foundParameters : null;
}

export function extractQuery(search: string): Record<string, string> {
  const foundQueries: Record<string, string> = {};
  const searchParameters = new URLSearchParams(search);

  searchParameters.forEach((value, key) => {
    foundQueries[key] = value;
  });

  return foundQueries;
}
