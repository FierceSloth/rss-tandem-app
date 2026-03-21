import type { IUserDetails } from '@/service/user-service/types/types';
import type { User } from '@supabase/supabase-js';

export const userMapper = {
  mapToUserDetails(dto: User): IUserDetails {
    return {
      username: dto.user_metadata.username,
      email: dto.email,
    };
  },
};
