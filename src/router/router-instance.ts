import { Router } from './router';

let router: Router;

export function createRouter(): Router {
  if (!router) {
    router = new Router();
  }
  return router;
}

export { router };
