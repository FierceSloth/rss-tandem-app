import { appEmitter } from '@/common/utils/emitter';
import { router } from './router-instance';
import { AppEvents } from '@/common/enums/enums';

export function useParams(): Record<string, string> {
  return router.getParams();
}

export function useNavigate(page: string, params = {}, query = {}): void {
  appEmitter.emit(AppEvents.ROUTER_NAVIGATE, { page, params, query });
}
