export enum QuizEvents {
  NEXT = 'quiz:next',
  SKIP = 'quiz:skip',
  ANSWER = 'quiz:answer',
  PROGRESS = 'quiz:progress',
  RETRY = 'quiz:retry',
  RESULT = 'quiz:result',
}

export enum QuizViewState {
  LOADING = 'loading',
  QUIZ = 'quiz',
  RESULT = 'result',
  ERROR = 'error',
}
