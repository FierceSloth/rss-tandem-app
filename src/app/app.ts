import type { Router } from '@/router/router';
import { createRouter } from '@/router/router-instance';
import { layout } from '@components/layout/layout';

export class App {
  constructor() {
    document.body.append(layout.node);
    const router: Router = createRouter(layout.root.node);
    router.init();
  }
}
