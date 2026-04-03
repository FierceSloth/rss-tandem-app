import type { TheoryHubPage } from './theory-hub-page';
import { useNavigate, useParams } from '@/router/hooks';
import { theoryHubRepository } from './repositories/theory-hub.repository';
import { ROUTES } from '@/router/constants';
import { Toast } from '@/components/ui/toast/toast.view';
import { messages } from '@/common/constants/messages';
import { ProgressService } from '@/service/progress/progress.service';

export class TheoryHubController {
  private view: TheoryHubPage;

  private levelId: string = useParams()['id'];
  private navigate = useNavigate();

  constructor(view: TheoryHubPage) {
    this.view = view;

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
      const entity = await theoryHubRepository.fetchLevelById(this.levelId);

      this.view.renderLayout(entity);

      this.view.setReady();
    } catch (error) {
      console.error('Failed to load theory hub:', error);
      new Toast({
        message: messages.errors.failedLoadTheoryHub,
        type: 'error',
      });

      this.navigate(ROUTES.NOT_FOUND_PAGE);
    } finally {
      this.view.hideLoading();
    }
  }

  private initListeners(): void {
    this.view.backButton.addListener('click', () => {
      this.navigate(ROUTES.ROADMAP_PAGE);
    });

    this.view.continueButton.addListener('click', () => {
      void (async (): Promise<void> => {
        this.view.continueButton.setDisabled(true);
        try {
          await ProgressService.saveLevelProgress(this.levelId, 1, 1);
          this.navigate(ROUTES.ROADMAP_PAGE);
        } catch (error) {
          if (error instanceof Error) {
            new Toast({
              message: error.message,
              type: 'error',
            });
          }
          this.view.continueButton.setDisabled(false);
        }
      })();
    });
  }
}
