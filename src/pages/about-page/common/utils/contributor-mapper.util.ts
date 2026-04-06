import type { IContributor, IContributorDto } from '@/pages/about-page/common/types/types';

export const contributorMapper = {
  mapDtoToContributor(data: IContributorDto[]): IContributor[] {
    return data.map((contributor) => ({
      userRole: contributor.user_role,
      avatarUrl: contributor.avatar_url,
      username: contributor.username,
      contributions: contributor.contributions,
      githubUrl: contributor.github_url,
    }));
  },
};
