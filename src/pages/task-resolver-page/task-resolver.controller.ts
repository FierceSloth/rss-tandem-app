import { ExecutionController } from '@/controllers/execution.controller';
import type { TaskResolverPage } from './task-resolver-page';

export class TaskResolvePageController {
  private view: TaskResolverPage;
  private executionController: ExecutionController;

  constructor(view: TaskResolverPage) {
    this.view = view;

    // 1. Создаем контроллер выполнения, прокидывая в него компоненты из View
    this.executionController = new ExecutionController(this.view.editor, this.view.terminal, this.view.runButton);

    // 2. Загружаем демонстрационные тесты
    this.initDemonstrationTests();
  }

  private initDemonstrationTests(): void {
    // Пишем тесты в виде строки, как требует CodeEngineService
    const demoTests = `
      // Проверяем, существует ли функция
      if (typeof sum !== 'function') {
        throw new Error("Функция 'sum' не найдена! Убедитесь, что вы ее объявили.");
      }
      
      // Проверяем логику работы
      const result1 = sum(2, 3);
      if (result1 !== 5) {
        throw new Error("Тест 1 провален: ожидалось 5 для sum(2, 3), получено: " + result1);
      }

      const result2 = sum(-1, 1);
      if (result2 !== 0) {
        throw new Error("Тест 2 провален: ожидалось 0 для sum(-1, 1), получено: " + result2);
      }
    `;

    // 3. Передаем тесты в ExecutionController. Он очистит терминал и выведет статус "Ready".
    this.executionController.setTests(demoTests);
  }
}
