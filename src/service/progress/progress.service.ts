import { UserService } from '@/service/user-service/user.service';
import { userLevelProgressRepository } from '@/repositories/user-level-progress.repository';
import { Toast } from '@/components/ui/toast/toast.view';
import { messages as commonMessages } from '@/common/constants/messages';
import { LevelStatus } from '@/common/enums/enums';
import { getStars } from '@/components/features/score/common/utils/score.util';
import { messages } from './constants/messages';

export class ProgressService {
  public static async saveLevelProgress(levelId: string, correctAnswers: number, totalTasks: number): Promise<void> {
    try {
      const user = await UserService.getUserDetails();

      if (!user) {
        new Toast({ message: commonMessages.errors.userNotFound, type: 'error' });
        throw new Error(commonMessages.errors.userNotFound);
      }

      const stars = getStars(correctAnswers, totalTasks);

      await userLevelProgressRepository.saveUserLevelProgress({
        user_id: user.id,
        level_id: levelId,
        status: LevelStatus.COMPLETED,
        stars: stars,
      });
    } catch (error) {
      console.error(messages.errors.failedSaveForLevel(levelId), error);
      new Toast({
        message: messages.errors.failedSaveProgress,
        type: 'error',
      });
      throw error;
    }
  }
}
