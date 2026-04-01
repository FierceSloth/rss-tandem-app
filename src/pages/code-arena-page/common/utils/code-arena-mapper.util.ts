import type { ICodeArenaDto, ICodeArenaEntities } from '../types/types';

export const codeArenaMapper = {
  mapTask(dto: ICodeArenaDto): ICodeArenaEntities {
    return {
      title: dto.title,
      topic: dto.topic,
      description: dto.description,
      initialCode: dto.initial_code,
      tests: dto.tests,
    };
  },
};
