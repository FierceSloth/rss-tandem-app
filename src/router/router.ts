import { EMPTY } from '@/common/constants/constants';
import { isHistoryState, pushState } from './utils/history';
import { BASE_URL, BASE_URL_WITHOUT_LAST_SLASH, pathnameEqualsRoute, ROOT_URL } from './utils/path';
import type { IPathData, IRoute } from './types';
import { ROUTER_NAVIGATE, ROUTES } from './constants';
import type { IPage } from '@/common/types/types';
import { UserService } from '@/service/user-service/user-service';
import { routes } from './routes';
import { appEmitter } from '@/common/utils/emitter';
import { messages } from '@/common/constants/messages';
import { extractQuery, matchRouteAndExtractParameters } from './core/route-matcher';

export class Router {
  private root: HTMLElement;
  private params: Record<string, string> = {};
  private currentPage: IPage | null = null;
  private readonly notFoundRoute: IRoute;

  constructor(root: HTMLElement) {
    this.root = root;

    const route = routes.find((r) => r.path === ROUTES.NOT_FOUND_PAGE);
    if (!route) {
      throw new Error(messages.errors.pageNotFound(ROUTES.NOT_FOUND_PAGE));
    }
    this.notFoundRoute = route;

    appEmitter.on<IPathData>(ROUTER_NAVIGATE, ({ page, params = {}, query = {} }: IPathData) => {
      this.navigateTo(page, params, query);
    });
  }

  public init(): void {
    document.addEventListener('DOMContentLoaded', () => {
      const route: string = `${this.normalizePath(location.pathname)}${location.search ?? ''}`;
      this.handleRoute(route, true);
    });

    addEventListener('popstate', (event: PopStateEvent) => {
      const historyPath: string = isHistoryState(event.state)
        ? event.state.path
        : `${location.pathname}${location.search ?? ''}`;
      const route: string = this.normalizePath(historyPath);
      this.handleRoute(route, false);
    });
  }

  public getParams(): Record<string, string> {
    return this.params;
  }

  public navigateTo(
    routePath: string,
    parameters: Record<string, string> = {},
    queryParameters: Record<string, string> = {}
  ): void {
    let path = routePath;

    for (const [key, value] of Object.entries(parameters)) {
      path = path.replace(`:${key}`, value);
    }

    const query = new URLSearchParams(queryParameters).toString();
    const fullPath = query ? `${path}?${query}` : path;

    this.handleRoute(fullPath, true);
  }

  private handleRoute(fullPath: string, pushable = false): void {
    this.validateQuery(fullPath);
    const [pathname, search = ''] = fullPath.split('?');
    const routeAndParameters = matchRouteAndExtractParameters(pathname, routes);

    if (!routeAndParameters) {
      this.redirectToNotFound();
      return;
    }

    const { route, params } = routeAndParameters;

    const redirectPath = this.resolveSecurityRedirect(route);
    if (redirectPath) {
      this.navigateTo(redirectPath);
      return;
    }

    const queryParameters = extractQuery(search);
    this.params = { ...params, ...queryParameters };

    if (pushable && !pathnameEqualsRoute(route.path)) {
      pushState(fullPath);
    }

    this.render(route);
  }

  private redirectToNotFound(): void {
    if (!pathnameEqualsRoute(this.notFoundRoute.path)) {
      pushState(this.notFoundRoute.path);
    }

    this.render(this.notFoundRoute);
  }

  private render(route: IRoute): void {
    if (this.currentPage?.destroy) {
      this.currentPage.destroy();
    }
    this.root.innerHTML = EMPTY;

    const pageInstance: IPage = route.page();
    pageInstance.render();
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
      throw new Error(messages.errors.urlQueryCorrupted(path));
    }
  }

  private resolveSecurityRedirect(route: IRoute): string | null {
    if (route.meta.secured && !UserService.isAuthenticated() && route.path !== ROUTES.AUTH_PAGE) {
      return ROUTES.AUTH_PAGE;
    }

    if (UserService.isAuthenticated() && route.path === ROUTES.AUTH_PAGE) {
      return ROUTES.LEVEL_SELECTION_PAGE;
    }

    return null;
  }
}
