import { EMPTY } from '@common/constants/constants';
import type { ILevel, ITrueFalse, ITrueFalseDto } from '@/pages/true-false-page/common/types/types';

export const trueFalseMapper = {
  mapDtoToTrueFalse(data: ITrueFalseDto[]): ITrueFalse[] {
    return data.map((task) => {
      const level: ILevel = Array.isArray(task.levels) ? task.levels[0] : task.levels;

      return {
        id: task.id,
        levelId: task.level_id,
        codeSnippet: task.code_snippet || EMPTY,
        answer: task.answer,
        isCorrect: task.is_correct,
        tag: task.tag || EMPTY,
        moduleId: level?.module_id,
      };
    });
  },
};
