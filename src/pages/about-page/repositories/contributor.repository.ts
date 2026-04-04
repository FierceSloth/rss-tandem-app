import { supabase } from '@/api/supabase/supabase-client';
import type { IContributor } from '@/pages/about-page/common/types/types';
import { contributorMapper } from '@/pages/about-page/common/utils/contributor-mapper.util';

export class ContributorRepository {
  public async fetchContributors(): Promise<IContributor[]> {
    const { data, error } = await supabase
      .from('contributors')
      .select(
        `
        id,
        user_role,
        avatar_url,
        username,
        contributions,
        github_url
      `
      )
      .order('id', { ascending: true });

    if (error) throw error;
    return contributorMapper.mapDtoToContributor(data);
  }
}
