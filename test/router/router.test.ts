import { describe, it, expect } from 'vitest';
import { ROUTES } from '@/router/constants';
import { pushStateSpy, testRouter as router, setupRouter } from './utils/router-setup';

describe('Router navigation', () => {
  setupRouter();

  it('should push state when navigating via navigateTo', () => {
    router.navigateTo(ROUTES.TRUE_FALSE_PAGE, { id: '1' }, { level: '2', mode: 'junior' });

    expect(pushStateSpy).toHaveBeenCalled();
  });

  it('should redirect to not found on wrong url', () => {
    router.navigateTo('wrong-url');

    expect(location.pathname).toContain('/not-found');
  });

  it('should store params and query', () => {
    router.navigateTo(ROUTES.TRUE_FALSE_PAGE, { id: '5' }, { level: '5', mode: 'middle' });
    expect(router.getParams()).toEqual({
      id: '5',
      level: '5',
      mode: 'middle',
    });
  });

  it('should change params and query between navigations', () => {
    router.navigateTo(ROUTES.TRUE_FALSE_PAGE, { id: '1' }, { level: '2', mode: 'junior' });
    expect(router.getParams()).toEqual({
      id: '1',
      level: '2',
      mode: 'junior',
    });

    router.navigateTo(ROUTES.ABOUT_PAGE);
    expect(router.getParams()).toEqual({});

    router.navigateTo(ROUTES.QUIZ_PAGE, { id: '2' }, { level: '1' });
    expect(router.getParams()).toEqual({
      id: '2',
      level: '1',
    });
  });

  it('should handle backward and forward history navigation', () => {
    router.navigateTo(ROUTES.TRUE_FALSE_PAGE, { id: '1' }, { level: '2', mode: 'junior' });

    expect(location.pathname).toContain('/true-false/1');
    expect(location.search).toBe('?level=2&mode=junior');
    expect(router.getParams()).toEqual({
      id: '1',
      level: '2',
      mode: 'junior',
    });

    router.navigateTo(ROUTES.QUIZ_PAGE, { id: '2' }, { level: '1' });

    expect(location.pathname).toContain('/quiz/2');
    expect(location.search).toBe('?level=1');
    expect(router.getParams()).toEqual({
      id: '2',
      level: '1',
    });

    globalThis.dispatchEvent(
      new PopStateEvent('popstate', {
        state: { path: '/true-false/1?level=2&mode=junior' },
      })
    );

    expect(router.getParams()).toEqual({
      id: '1',
      level: '2',
      mode: 'junior',
    });

    globalThis.dispatchEvent(
      new PopStateEvent('popstate', {
        state: { path: '/quiz/2?level=1' },
      })
    );

    expect(router.getParams()).toEqual({
      id: '2',
      level: '1',
    });
  });
});
