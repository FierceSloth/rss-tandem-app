import type { Router } from '@/router/router';
import { createRouter } from '@/router/router-instance';

export class App {
  constructor() {
    const router: Router = createRouter();
    router.init();
  }
}
