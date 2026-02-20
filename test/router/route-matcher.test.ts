import { extractParameters, extractQuery, matchRouteAndExtractParameters } from '@/router/core/route-matcher';
import { routes } from '@/router/routes';
import { describe, it, expect } from 'vitest';

describe('Handle route, params and query', () => {
  it('should match dynamic route and extract params', () => {
    const { params } = matchRouteAndExtractParameters('/quiz/42', routes) ?? {};

    expect(params).toEqual({ id: '42' });
  });

  it('should return null if route does not match', () => {
    const result = extractParameters('/quiz/:id', '/quiz');

    expect(result).toBeNull();
  });

  it('should extract query parameters', () => {
    const query = extractQuery('level=2&mode=hard');

    expect(query).toEqual({
      level: '2',
      mode: 'hard',
    });
  });

  it('should merge route params and query manually', () => {
    const routeParameters = extractParameters('/quiz/:id', '/quiz/1')!;
    const query = extractQuery('level=2');

    expect({ ...routeParameters, ...query }).toEqual({
      id: '1',
      level: '2',
    });
  });
});
