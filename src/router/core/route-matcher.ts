import type { IRoute, IRouteWithParams } from '@/router/types';

export function matchRouteAndExtractParameters(pathname: string, routes: IRoute[]): IRouteWithParams | null {
  return (
    routes
      .map((route: IRoute) => ({ route, params: extractParameters(route.path, pathname) }))
      .find((entry: IRouteWithParams): entry is IRouteWithParams => entry.params !== null) ?? null
  );
}

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
