import { appEmitter } from '@/common/utils/emitter';
import { router } from './router-instance';
import { ROUTER_NAVIGATE } from './constants';

export function useParams(): Record<string, string> {
  return router.getParams();
}

export function useNavigate(page: string, params = {}, query = {}): void {
  appEmitter.emit(ROUTER_NAVIGATE, { page, params, query });
}
