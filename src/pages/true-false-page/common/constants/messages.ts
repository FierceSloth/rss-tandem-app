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
  },
  errors: {
    taskNumberCannotBeNegative: 'Task number cannot be negative',
    failedLoadTaskPleaseTryLater: 'Failed to load true false task data. Please try again later.',
    failedLoadTask: 'Failed to load true false task',
  },
  messages: {},
};
