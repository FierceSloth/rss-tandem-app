import { isHistoryState, updateHistory } from './utils/history';
import { BASE_URL, BASE_URL_WITHOUT_LAST_SLASH, pathnameEqualsRoute, ROOT_URL } from './utils/path';
import type { ILocationState, INavigateFunction, INavigateOptions, INavigationTarget, IRoute } from './types';
import { ROUTES } from './constants';
import type { IPage } from '@/common/types/types';
import { UserService } from '@/service/user-service/user.service';
import { routes } from './routes';
import { appEmitter } from '@/common/utils/emitter';
import { messages } from '@/common/constants/messages';
import { extractQuery, matchRouteAndExtractParameters } from './core/route-matcher';
import { Component } from '@/components/base/component';
import { AppEvents } from '@/common/enums/enums';
import { NavigationMode } from './navigation-mode';

export class Router {
  private root: Component;
  private params: Record<string, string> = {};
  private currentPage: IPage | null = null;
  private locationState: unknown = null;
  private readonly notFoundRoute: IRoute;

  constructor() {
    this.root = new Component({ attrs: { id: 'app' } });
    document.body.append(this.root.node);

    const route = routes.find((r) => r.path === ROUTES.NOT_FOUND_PAGE);
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
      const route: string = `${this.normalizePath(location.pathname)}${location.search ?? ''}`;
      this.handleRoute(route, NavigationMode.PUSH);
    });

    addEventListener('popstate', (event: PopStateEvent) => {
      const historyPath: string = isHistoryState(event.state)
        ? event.state.path
        : `${location.pathname}${location.search ?? ''}`;
      const route: string = this.normalizePath(historyPath);

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
    this.validateQuery(fullPath);
    const [pathname, search = ''] = fullPath.split('?');
    const routeAndParameters = matchRouteAndExtractParameters(pathname, routes);

    if (!routeAndParameters) {
      this.redirectToNotFound();
      return;
    }

    const { route, params } = routeAndParameters;

    const redirect = this.resolveSecurity(route);
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
  }

  private redirectToNotFound(): void {
    if (!pathnameEqualsRoute(this.notFoundRoute.path)) {
      updateHistory(this.notFoundRoute.path, null, NavigationMode.PUSH);
    }

    this.render(this.notFoundRoute);
  }

  private render(route: IRoute): void {
    if (this.currentPage?.destroy) {
      this.currentPage.destroy();
    }
    this.root.destroyChildren();

    const pageInstance: IPage = route.page();
    const pageElement = pageInstance.render();
    this.root.append(pageElement);
    this.currentPage = pageInstance;
  }

  /**
   * This method removes baseUrl from path
   *
   * @param pathname location.pathname + location.search with base url or history state path
   * @returns pathname without baseUrl
   */
  private normalizePath(pathname: string): string {
    if (!pathname.startsWith(BASE_URL)) {
      return pathname;
    }

    const normalized = pathname.slice(BASE_URL_WITHOUT_LAST_SLASH.length);
    return normalized || ROOT_URL;
  }

  private validateQuery(path: string): void {
    if (path.indexOf('?') != path.lastIndexOf('?')) {
      console.error(messages.errors.urlQueryCorrupted(path));
      this.redirectToNotFound();
    }
  }

  private resolveSecurity(route: IRoute): INavigationTarget | null {
    if (route.meta.secured && !UserService.isAuthenticated() && route.path !== ROUTES.AUTH_PAGE) {
      return { to: ROUTES.AUTH_PAGE, options: { replace: true } };
    }

    if (UserService.isAuthenticated() && route.path === ROUTES.AUTH_PAGE) {
      return { to: ROUTES.LEVEL_SELECTION_PAGE, options: { replace: false } };
    }

    return null;
  }
}
