export const messages = {
  titles: {
    level: (current: string | number, total: string | number): string => `LEVEL ${current}/${total}`,
  },
  buttons: {
    continueButton: 'CONTINUE',
    skipButton: 'SKIP QUESTION',
    tryAgainButton: 'TRY AGAIN',
    backToRoadmapButton: 'BACK TO ROADMAP',
  },
  errors: {
    taskNumberCannotBeNegative: 'Task number cannot be negative',
    failedLoadQuizPleaseTryLater: 'Failed to load quiz data. Please try again later.',
    failedLoadQuiz: 'Failed to load quiz',
    failedSaveProgressWithLevelId: (id: string): string => `Failed save progress for level id ${id}`,
    failedSaveProgress: 'Failed save progress',
  },
  messages: {
    noCodeQuestion: '// Pure theory question',
  },
};
