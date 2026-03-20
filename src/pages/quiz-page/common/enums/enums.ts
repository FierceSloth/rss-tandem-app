export enum QuizEvents {
  NEXT = 'quiz:next',
  SKIP = 'quiz:skip',
  ANSWER = 'quiz:answer',
  TIMER = 'quiz:timer',
  TAG = 'quiz:tag',
  PROGRESS = 'quiz:progress',
  START = 'quiz:start',
  RETRY = 'quiz:retry',
  RESULT = 'quiz:result',
}

export enum QuizViewState {
  LOADING = 'loading',
  QUIZ = 'quiz',
  RESULT = 'result',
  ERROR = 'error',
}
