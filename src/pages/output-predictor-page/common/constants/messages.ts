export const messages = {
  labels: {
    optionKey: (key: string): string => `OPTION ${key}`,
    predictOutputSequence: 'Predict output sequence',
    executionTag: (tag: string): string => `EXECUTION // ${tag.toUpperCase()}`,
    executionTagDefault: 'EXECUTION // JS_CORE_V8',
    statusRunning: 'running',
    simulationDefault: 'SIMULATION -/-',
    simulationCount: (current: number, total: number): string => `SIMULATION ${current}/${total}`,
    difficulty: 'DIFFICULTY',
    skipChallenge: 'SKIP CHALLENGE [Esc]',
  },
  checkbox: {
    empty: '[ ]',
    checked: '[x]',
  },
  defaults: {
    titleLoading: 'Loading...',
    difficultyDefault: '-',
  },
};
