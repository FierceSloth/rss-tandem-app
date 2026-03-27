import type { IResourceLinkDto, IResourceLinkEntity, ITheoryHubDto, ITheoryHubEntity } from '../types/types';

export const roadmapMapper = {
  mapResource(dto: IResourceLinkDto): IResourceLinkEntity {
    return {
      title: dto.title,
      url: dto.url,
      type: dto.type,
      source: dto.source,
    };
  },

  mapTask(dto: ITheoryHubDto): ITheoryHubEntity {
    return {
      title: dto.title,
      description: dto.description,
      materials: dto.materials.map((resource) => this.mapResource(resource)),
    };
  },
};
