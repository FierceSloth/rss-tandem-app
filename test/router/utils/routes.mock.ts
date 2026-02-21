import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { vi } from 'vitest';

vi.mock('@/router/routes', () => ({
  routes: [
    {
      path: '/true-false/:id',
      meta: { secured: true },
      page: (): IPage => ({
        render: (): Component =>
          new Component({
            className: ['true-false', 'pageContainer'],
          }),
        destroy: (): void => {},
      }),
    },
    {
      path: '/quiz/:id',
      meta: { secured: true },
      page: (): IPage => ({
        render: (): Component =>
          new Component({
            className: ['quiz', 'pageContainer'],
          }),
        destroy: (): void => {},
      }),
    },
    {
      path: '/about',
      meta: { secured: false },
      page: (): IPage => ({
        render: (): Component =>
          new Component({
            className: ['about', 'pageContainer'],
          }),
        destroy: (): void => {},
      }),
    },
    {
      path: '/not-found',
      meta: { secured: false },
      page: (): IPage => ({
        render: (): Component =>
          new Component({
            className: ['not-found', 'pageContainer'],
          }),
        destroy: (): void => {},
      }),
    },
  ],
}));
