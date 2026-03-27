/* ========================================================================== */
/*                         DTO (Data Transfer Objects)                        */
/* ========================================================================== */

export interface IResourceLinkDto {
  title: string;
  url: string;
  type: 'video' | 'article';
  source: string;
}

export interface ITheoryHubDto {
  id: string;
  level_id: string;
  title: string;
  description: string;
  materials: IResourceLinkDto[];
}

/* ========================================================================== */
/*                                   Entites                                  */
/* ========================================================================== */

export interface IResourceLinkEntity {
  title: string;
  url: string;
  type: 'video' | 'article';
  source: string;
}

export interface ITheoryHubEntity {
  title: string;
  description: string;
  materials: IResourceLinkEntity[];
}
