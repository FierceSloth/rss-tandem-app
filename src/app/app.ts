import { createRouter } from '@/router/router-instance';
import { authStore } from '@/service/auth/auth-store';

export class App {
  constructor() {
    void this.init();
  }

  public async init(): Promise<void> {
    await authStore.initAuth();
    createRouter().init();
  }
}
