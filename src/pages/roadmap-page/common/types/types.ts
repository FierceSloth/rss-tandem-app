export type LevelStatus = 'locked' | 'active' | 'completed';
export type LevelDifficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type WidgetType =
  | 'QUIZ'
  | 'TRUE_FALSE'
  | 'TASK_RESOLVER'
  | 'VIDEO_TASK'
  | 'OUTPUT_PREDICTOR'
  | 'BOSS_BATTLE'
  | 'ERROR_SCANNER';

/* ========================================================================== */
/*                                   Server                                   */
/* ========================================================================== */

export interface IServerLevelData {
  id: string;
  title: string;
  description: string;
  widgetType: WidgetType;
  difficulty: LevelDifficulty;
  status: LevelStatus;
  stars: number;
}

export interface IServerModuleData {
  title: string;
  levels: IServerLevelData[];
}

export interface IRoadmapResponse {
  modules: IServerModuleData[];
}

/* ========================================================================== */
/*                                   Client                                   */
/* ========================================================================== */

export type NodePosition = 'left' | 'right' | 'center';

export interface ILevelData extends IServerLevelData {
  displayId: number;
  position: NodePosition;
}
