import type { IPage } from '@/common/types/types';
import type { ROUTES } from './constants';

export type TRoute = (typeof ROUTES)[keyof typeof ROUTES];

export type TNavigateFunction<T = unknown> = (
  to: string | number,
  params?: Record<string, string>,
  query?: Record<string, string>,
  options?: INavigateOptions<T>
) => void;

export interface IHistoryState {
  path: IRoute;
}

export interface IMetaData {
  secured: boolean;
}

export interface IRoute {
  path: string;
  page: () => IPage;
  meta: IMetaData;
}

export interface IRouteWithParams {
  route: IRoute;
  params: Record<string, string> | null;
}

export interface ILocationState<T = unknown> {
  pathname: string;
  search: string;
  state: T | null;
}

export interface INavigateOptions<T = unknown> {
  replace?: boolean;
  state?: T;
}

export interface INavigationTarget<T = unknown> {
  to: string | number;
  options?: INavigateOptions<T>;
}

export interface INavigateFunction extends INavigationTarget {
  params?: Record<string, string>;
  query?: Record<string, string>;
}
