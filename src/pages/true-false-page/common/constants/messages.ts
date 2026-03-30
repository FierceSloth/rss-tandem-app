export const messages = {
  titles: {
    timeRemaining: 'TIME REMAINING',
    currentStreak: 'CURRENT STREAK',
    progress: 'PROGRESS',
    level: (current: string | number, total: string | number): string => `${current}/${total}`,
    id: (id: string | number): string => `ID: Q${id}`,
  },
  buttons: {
    verifyButton: 'VERIFY',
    confirmStatement: 'CONFIRM STATEMENT',
    rejectButton: 'REJECT',
    denyStatement: 'DENY STATEMENT',
    accept: 'ACCEPT',
    aButton: 'A',
    bButton: 'B',
    spaceButton: 'SPACE',
    deny: 'DENY',
    skip: 'SKIP',
  },
  errors: {
    taskNumberCannotBeNegative: 'Task number cannot be negative',
    failedLoadTaskPleaseTryLater: 'Failed to load true false task data. Please try again later.',
    failedLoadTask: 'Failed to load true false task',
    failedSaveProgressWithLevelId: (id: string): string => `Failed save progress for level id ${id}`,
    failedSaveProgress: 'Failed save progress',
  },
  messages: {},
};
