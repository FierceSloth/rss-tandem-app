import './routes.mock';
import { beforeEach, afterEach, vi } from 'vitest';
import { Router } from '@/router/router';
import { UserService } from '@/service/user-service/user-service';

export let testRouter: Router;
export let pushStateSpy: ReturnType<typeof vi.spyOn>;

export function setupRouter(): void {
  beforeEach(() => {
    const root = document.createElement('div');
    document.body.innerHTML = '';

    testRouter = new Router(root);
    testRouter.init();
    vi.spyOn(UserService, 'isAuthenticated').mockReturnValue(true);

    pushStateSpy = vi
      .spyOn(history, 'pushState')
      .mockImplementation((_state: unknown, _title: string, url?: string | URL | null) => {
        if (typeof url === 'string') {
          const parsed = new URL(url, 'http://localhost');
          Object.defineProperty(globalThis, 'location', {
            value: parsed,
            writable: true,
          });
        }
      });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
}
