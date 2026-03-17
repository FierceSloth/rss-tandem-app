import { ExecutionController } from '@/controllers/execution.controller';
import type { CodeArenaPage } from './code-arena-page';

export class CodeArenaController {
  private view: CodeArenaPage;
  private executionController: ExecutionController;

  constructor(view: CodeArenaPage) {
    this.view = view;

    this.executionController = new ExecutionController(this.view.editor, this.view.terminal, this.view.runButton);

    this.init();
  }

  public destroy(): void {}

  private init(): void {
    this.loadTaskData();
    this.initListeners();
  }

  private loadTaskData(): void {
    // TODO: add supabase integration

    const initialCode = `function solve(tasks) {\n  const result = [];\n  \n  tasks.forEach(task => {\n    if (task.type === 'sync') {\n      result.push(task.id);\n    }\n  });\n\n  return result;\n}`;
    this.view.editor.setValue(initialCode);

    const taskTests = `
      if (typeof solve !== 'function') throw new Error("Function solve is not find!");
      const mockTasks = [{ id: 1, type: 'sync' }];
      if (JSON.stringify(solve(mockTasks)) !== JSON.stringify([1])) {
        throw new Error("Expected array [1]");
      }
    `;
    this.executionController.setTests(taskTests);
  }

  private initListeners(): void {
    this.view.submitButton.addListener('click', () => {
      console.log('Sending to server...');
      // TODO: add listener
    });
  }
}
