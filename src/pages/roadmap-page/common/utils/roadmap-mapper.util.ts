import type {
  ILevelDto,
  ILevelEntity,
  ILevelProgressDto,
  ILevelProgressEntity,
  IModuleDto,
  IModuleEntity,
} from '../types/types';

export const roadmapMapper = {
  mapProgress(dto: ILevelProgressDto): ILevelProgressEntity {
    return {
      status: dto.status,
      stars: dto.stars,
    };
  },

  mapLevel(dto: ILevelDto): ILevelEntity {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      widgetType: dto.widget_type,
      difficulty: dto.difficulty,
      userLevelProgress: dto.user_level_progress?.map((progress) => this.mapProgress(progress)),
    };
  },

  mapModule(dto: IModuleDto): IModuleEntity {
    return {
      id: dto.id,
      title: dto.title,
      levels: dto.levels?.map((level) => this.mapLevel(level)),
    };
  },

  mapModulesList(dtos: IModuleDto[]): IModuleEntity[] {
    return dtos.map((dto) => this.mapModule(dto));
  },
};
