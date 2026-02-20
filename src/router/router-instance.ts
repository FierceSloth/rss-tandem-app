import { Router } from './router';

let router: Router;

export function createRouter(node: HTMLElement): Router {
  if (!router) {
    router = new Router(node);
  }
  return router;
}

export { router };
