import type {
  IOutputPredictor,
  IOutputPredictorDto,
  IOutputPredictorOption,
  IOutputPredictorOptionDto,
} from '../types/types';

class OutputPredictorMapper {
  public mapDtoToQuestion(dto: IOutputPredictorDto): IOutputPredictor {
    return {
      id: dto.id,
      levelId: dto.level_id,
      title: dto.title,
      code: dto.code,
      tag: dto.tag,
      difficulty: dto.levels[0]?.difficulty ?? 'HARD',
      options: dto.options.map((option) => this.mapDtoToOption(option)),
    };
  }

  public mapDtoToQuestions(dtos: IOutputPredictorDto[]): IOutputPredictor[] {
    return dtos.map((dto) => this.mapDtoToQuestion(dto));
  }

  private mapDtoToOption(dto: IOutputPredictorOptionDto): IOutputPredictorOption {
    return {
      key: dto.key,
      lines: dto.lines,
      isCorrect: dto.is_correct,
    };
  }
}

export const outputPredictorMapper = new OutputPredictorMapper();
