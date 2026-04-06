import { ContributorRepository } from '@/pages/about-page/repositories/contributor.repository';
import type { AboutContributors } from './about-contributors.view';
import { messages } from '@/pages/about-page/common/constants/messages';
import { Toast } from '@/components/ui/toast/toast.view';

export class AboutContributorsController {
  private view: AboutContributors;
  private contributorRepository: ContributorRepository;

  constructor(view: AboutContributors) {
    this.view = view;
    this.contributorRepository = new ContributorRepository();

    void this.loadContributors();
  }

  private async loadContributors(): Promise<void> {
    this.view.showLoading();

    try {
      const contributors = await this.contributorRepository.fetchContributors();

      this.view.buildContributors(contributors);
    } catch (error) {
      console.error(messages.errors.failedLoadContributors, error);

      new Toast({
        message: messages.errors.failedLoadContributors,
        type: 'error',
      });
    } finally {
      this.view.hideLoading();
    }
  }
}
