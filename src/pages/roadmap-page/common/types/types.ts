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
/*                                  Supabase                                  */
/* ========================================================================== */

export interface ISupabaseLevelProgress {
  status: LevelStatus;
  stars: number;
}

export interface ISupabaseLevel {
  id: string;
  title: string;
  description: string;
  widget_type: WidgetType;
  difficulty: LevelDifficulty;
  user_level_progress: ISupabaseLevelProgress[];
}

export interface ISupabaseModule {
  id: number;
  title: string;
  levels: ISupabaseLevel[];
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
