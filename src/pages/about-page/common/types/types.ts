import type { UUID } from 'node:crypto';

/* ========================================================================== */
/*                         DTO (Data Transfer Objects)                        */
/* ========================================================================== */

export interface IContributorDto {
  id: UUID | number;
  user_role: string;
  avatar_url: string;
  username: string;
  contributions: string;
  github_url: string;
}

/* ========================================================================== */
/*                          Entities (Domain Models)                          */
/* ========================================================================== */

export interface IContributor {
  userRole: string;
  avatarUrl: string;
  username: string;
  contributions: string;
  githubUrl: string;
}
