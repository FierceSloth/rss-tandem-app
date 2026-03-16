import { isHistoryState, updateHistory } from './utils/history';
import { pathnameEqualsRoute } from './utils/path';
import type { ILocationState, INavigateFunction, INavigateOptions, IRoute } from './types';
import { ROUTES } from './constants';
import type { IPage } from '@/common/types/types';
import { routes } from './routes';
import { appEmitter } from '@/common/utils/emitter.util';
import { messages } from '@/common/constants/messages';
import { extractQuery, matchRouteAndExtractParameters } from './core/route-matcher';
import { Component } from '@/components/base/component';
import { AppEvents } from '@/common/enums/enums';
import { NavigationMode } from './navigation-mode';
import { normalizePath, resolveSecurity, isQueryValid } from './core/router-handlers';

export class Router {
  private root: Component;
  private params: Record<string, string> = {};
  private currentPage: IPage | null = null;
  private locationState: unknown = null;
  private readonly notFoundRoute: IRoute;

  constructor() {
    this.root = new Component({ attrs: { id: 'app' } });
    document.body.append(this.root.node);

    const route = routes.find((route) => route.path === ROUTES.NOT_FOUND_PAGE);
    if (!route) {
      throw new Error(messages.errors.pageNotFound(ROUTES.NOT_FOUND_PAGE));
    }
    this.notFoundRoute = route;

    appEmitter.on(AppEvents.ROUTER_NAVIGATE, ({ to, params, query, options }: INavigateFunction) => {
      this.navigateTo(to, params, query, options);
    });
  }

  public init(): void {
    document.addEventListener('DOMContentLoaded', () => {
      const route: string = `${normalizePath(location.pathname)}${location.search ?? ''}`;
      this.handleRoute(route, NavigationMode.PUSH);
    });

    addEventListener('popstate', (event: PopStateEvent) => {
      const historyPath: string = isHistoryState(event.state)
        ? event.state.path
        : `${location.pathname}${location.search ?? ''}`;
      const route: string = normalizePath(historyPath);

      this.locationState = event.state?.state ?? null;

      this.handleRoute(route, NavigationMode.SKIP);
    });
  }

  public getParams(): Record<string, string> {
    return this.params;
  }

  public navigateTo(
    to: string | number,
    parameters: Record<string, string> = {},
    queryParameters: Record<string, string> = {},
    options?: INavigateOptions
  ): void {
    if (typeof to === 'number') {
      history.go(to);
      return;
    }
    let path = to;
    for (const [key, value] of Object.entries(parameters)) {
      path = path.replace(`:${key}`, value);
    }
    const query = new URLSearchParams(queryParameters).toString();
    path = query ? `${path}?${query}` : path;

    const { replace = false, state = null } = options ?? {};

    this.locationState = state;

    this.handleRoute(path, replace ? NavigationMode.REPLACE : NavigationMode.PUSH);
  }

  public getLocation<T = unknown>(): ILocationState<T> {
    return {
      pathname: location.pathname,
      search: location.search,
      state: this.locationState as T | null,
    };
  }

  private handleRoute(fullPath: string, mode: NavigationMode = NavigationMode.SKIP): void {
    if (!isQueryValid(fullPath)) {
      console.warn(messages.errors.urlQueryCorrupted(fullPath));
      this.redirectToNotFound();
      return;
    }
    const [pathname, search = ''] = fullPath.split('?');
    const routeAndParameters = matchRouteAndExtractParameters(pathname, routes);

    if (!routeAndParameters) {
      this.redirectToNotFound();
      return;
    }

    const { route, params } = routeAndParameters;

    const redirect = resolveSecurity(route);
    if (redirect) {
      this.navigateTo(redirect.to, {}, {}, redirect.options);
      return;
    }

    const queryParameters = extractQuery(search);
    this.params = { ...params, ...queryParameters };

    if (!pathnameEqualsRoute(route.path) && mode !== NavigationMode.SKIP) {
      updateHistory(fullPath, this.locationState, mode);
    }

    this.render(route);
    appEmitter.emit(AppEvents.ROUTE_CHANGED, pathname);
  }

  private redirectToNotFound(): void {
    if (!pathnameEqualsRoute(this.notFoundRoute.path)) {
      updateHistory(this.notFoundRoute.path, null, NavigationMode.PUSH);
    }

    this.render(this.notFoundRoute);
  }

  private render(route: IRoute): void {
    this.currentPage?.destroy?.();
    this.root.destroyChildren();

    const pageInstance: IPage = route.page();
    const pageElement = pageInstance.render();
    this.root.append(pageElement);
    this.currentPage = pageInstance;
  }
}
