export type LevelStatus = 'locked' | 'active' | 'completed';
export type LevelDifficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type NodePosition = 'left' | 'right' | 'center';

export interface ILevelData {
  id: string;
  title: string;
  description: string;
  difficulty: LevelDifficulty;
  status: LevelStatus;
  stars: number;
  position: NodePosition;
}
