import type { IPage } from '@/common/types/types';
import { vi } from 'vitest';

vi.mock('@/router/routes', () => ({
  routes: [
    {
      path: '/true-false/:id',
      meta: { secured: true },
      page: (): IPage => ({
        render: (): void => {},
        destroy: (): void => {},
      }),
    },
    {
      path: '/quiz/:id',
      meta: { secured: true },
      page: (): IPage => ({
        render: (): void => {},
        destroy: (): void => {},
      }),
    },
    {
      path: '/about',
      meta: { secured: false },
      page: (): IPage => ({
        render: (): void => {},
        destroy: (): void => {},
      }),
    },
    {
      path: '/not-found',
      meta: { secured: false },
      page: (): IPage => ({
        render: (): void => {},
        destroy: (): void => {},
      }),
    },
  ],
}));
