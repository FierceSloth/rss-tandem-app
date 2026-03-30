import { describe, it, expect } from 'vitest';
import { roadmapMapper } from './roadmap-mapper.util';
import type { ILevelDto, ILevelProgressDto, IModuleDto } from '../types/types';

const MOCK_STARS = 3;

describe('roadmapMapper utility', () => {
  it('should correctly map progress properties', () => {
    const mockProgressDto: ILevelProgressDto = {
      stars: MOCK_STARS,
      status: 'active',
    };

    const result = roadmapMapper.mapProgress(mockProgressDto);

    expect(result.status).toBe('active');
    expect(result.stars).toBe(MOCK_STARS);
  });

  it('should correctly map level properties', () => {
    const mockDto: ILevelDto = {
      id: '123',
      title: 'Test Level',
      description: 'Desc',
      widget_type: 'QUIZ',
      difficulty: 'easy',
      user_level_progress: [{ status: 'completed', stars: MOCK_STARS }],
    };

    const result = roadmapMapper.mapLevel(mockDto);

    expect(result.id).toBe('123');
    expect(result.widgetType).toBe('QUIZ');
    expect(result.userLevelProgress?.[0].stars).toBe(MOCK_STARS);
  });

  it('should handle undefined user_level_progress gracefully without crashing', () => {
    const mockDtoWithoutProgress = {
      id: '456',
      title: 'Empty Level',
      description: 'Desc',
      widget_type: 'CODE_ARENA',
      difficulty: 'medium',
      // without user_level_progress
    } as ILevelDto;

    const result = roadmapMapper.mapLevel(mockDtoWithoutProgress);

    expect(result.id).toBe('456');
    expect(result.userLevelProgress).toBeUndefined();
  });

  it('should correctly map module properties', () => {
    const MOCK_ID = 123;

    const mockLevelDto: ILevelDto = {
      id: '123',
      title: 'Test Level',
      description: 'Desc',
      widget_type: 'QUIZ',
      difficulty: 'easy',
      user_level_progress: [{ status: 'completed', stars: MOCK_STARS }],
    };

    const mockModuleDto: IModuleDto = {
      id: MOCK_ID,
      title: 'JavaScript Basic',
      levels: [mockLevelDto, mockLevelDto, mockLevelDto],
    };

    const result = roadmapMapper.mapModule(mockModuleDto);

    expect(result.id).toBe(MOCK_ID);
    expect(result.title).toBe('JavaScript Basic');
    expect(result.levels).toHaveLength(mockModuleDto.levels.length);
  });

  it('should handle undefined levels gracefully without crashing', () => {
    const MOCK_ID = 123;

    const mockModuleDto: IModuleDto = {
      id: MOCK_ID,
      title: 'JavaScript Basic',
      // without levels
    } as IModuleDto;

    const result = roadmapMapper.mapModule(mockModuleDto);

    expect(result.id).toBe(MOCK_ID);
    expect(result.title).toBe('JavaScript Basic');
    expect(result.levels).toBeUndefined();
  });
});
