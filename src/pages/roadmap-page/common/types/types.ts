export type LevelStatus = 'locked' | 'active' | 'completed';
export type LevelDifficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type WidgetType =
  | 'QUIZ'
  | 'TRUE_FALSE'
  | 'THEORY_HUB'
  | 'CODE_ARENA'
  | 'VIDEO_TASK'
  | 'OUTPUT_PREDICTOR'
  | 'BOSS_BATTLE'
  | 'ERROR_SCANNER';

/* ========================================================================== */
/*                         DTO (Data Transfer Objects)                        */
/* ========================================================================== */

export interface ILevelProgressDto {
  status: LevelStatus;
  stars: number;
}

export interface ILevelDto {
  id: string;
  title: string;
  description: string;
  widget_type: WidgetType;
  difficulty: LevelDifficulty;
  user_level_progress: ILevelProgressDto[];
}

export interface IModuleDto {
  id: number;
  title: string;
  levels: ILevelDto[];
}

/* ========================================================================== */
/*                          Entities (Domain Models)                          */
/* ========================================================================== */

export interface ILevelProgressEntity {
  status: LevelStatus;
  stars: number;
}

export interface ILevelEntity {
  id: string;
  title: string;
  description: string;
  widgetType: WidgetType;
  difficulty: LevelDifficulty;
  userLevelProgress: ILevelProgressEntity[];
}

export interface IModuleEntity {
  id: number;
  title: string;
  levels: ILevelEntity[];
}

/* ========================================================================== */
/*                                   Client                                   */
/* ========================================================================== */

export type NodePosition = 'left' | 'right' | 'center';

export interface ILevelData {
  id: string;
  title: string;
  description: string;
  widgetType: WidgetType;
  difficulty: LevelDifficulty;
  status: LevelStatus;
  stars: number;
  displayId: number;
  position: NodePosition;
}
