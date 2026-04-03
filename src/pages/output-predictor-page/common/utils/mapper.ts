import type { IOutputPredictor } from '../types/types';

interface OutputPredictorDto {
  id: string;
  level_id: string;
  title: string;
  code: string;
  tag: string;
  options: IOutputPredictor['options'];
  levels: { difficulty: 'EASY' | 'MEDIUM' | 'HARD' }[];
}

class OutputPredictorMapper {
  public mapDtoToQuestion(dto: OutputPredictorDto): IOutputPredictor {
    return {
      id: dto.id,
      levelId: dto.level_id,
      title: dto.title,
      code: dto.code,
      tag: dto.tag,
      difficulty: dto.levels[0]?.difficulty ?? 'HARD',
      options: dto.options,
    };
  }

  public mapDtoToQuestions(dtos: OutputPredictorDto[]): IOutputPredictor[] {
    return dtos.map((dto) => this.mapDtoToQuestion(dto));
  }
}

export const outputPredictorMapper = new OutputPredictorMapper();
