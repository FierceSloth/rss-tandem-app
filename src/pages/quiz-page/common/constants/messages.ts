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
    taskNumberConnotBeNegative: 'Task number cannot be negative',
  },
  messages: {},
};
