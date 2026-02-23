import type { IPage } from '@/common/types/types';
import type { ROUTES } from './constants';

export type TRoute = (typeof ROUTES)[keyof typeof ROUTES];

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

export interface IPathData {
  page: string;
  params: Record<string, string>;
  query: Record<string, string>;
}
