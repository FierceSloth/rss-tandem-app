import { ExecutionController } from '@/controllers/execution.controller';
import type { CodeArenaPage } from './code-arena-page';
import { codeArenaRepository } from './repositories/code-arena.repository';
import { Toast } from '@/components/ui/toast/toast.view';
import { messages } from '@/common/constants/messages';
import { useNavigate } from '@/router/hooks';
import { ROUTES } from '@/router/constants';

export class CodeArenaController {
  private view: CodeArenaPage;
  private executionController: ExecutionController;

  private navigate = useNavigate();

  constructor(view: CodeArenaPage) {
    this.view = view;

    this.executionController = new ExecutionController(this.view.editor, this.view.terminal, this.view.runButton);

    this.init();
  }

  public destroy(): void {}

  private init(): void {
    void this.loadTaskData();
    this.initListeners();
  }

  private async loadTaskData(): Promise<void> {
    this.view.showLoading();

    try {
      const entity = await codeArenaRepository.fetchMockTask();

      this.view.editor.setValue(entity.initialCode);
      this.executionController.setTests(entity.tests);

      this.view.renderLayout(entity);

      this.view.setReady();
    } catch (error) {
      console.error('Failed to load code arena:', error);

      new Toast({
        message: messages.errors.failedLoadCodeArena,
        type: 'error',
      });

      this.navigate(ROUTES.NOT_FOUND_PAGE);
    } finally {
      this.view.hideLoading();
    }
  }

  private initListeners(): void {
    this.view.submitButton.addListener('click', () => {
      console.log('Sending to server...');
      // TODO: add listener
    });
  }
}
