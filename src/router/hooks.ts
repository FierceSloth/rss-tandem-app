import { appEmitter } from '@/common/utils/emitter';
import { router } from './router-instance';
import { AppEvents } from '@/common/enums/enums';
import type { ILocationState, INavigateOptions, TNavigateFunction } from './types';

const navigate: TNavigateFunction = <T>(
  to: string | number,
  params?: Record<string, string>,
  query?: Record<string, string>,
  options?: INavigateOptions<T>
): void => {
  appEmitter.emit(AppEvents.ROUTER_NAVIGATE, { to, params, query, options });
};

export function useParams(): Record<string, string> {
  return router.getParams();
}

export function useNavigate(): TNavigateFunction {
  return navigate;
}

export function useLocation<T>(): ILocationState<T> {
  return router.getLocation<T>();
}
