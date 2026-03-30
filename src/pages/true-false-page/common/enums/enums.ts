export enum TrueFalseEvents {
  NEXT = 'true-false:next',
  SKIP = 'true-false:skip',
  ANSWER = 'true-false:answer',
  PROGRESS = 'true-false:progress',
  MARK_ANSWER = 'true-false:mark-answer',
  RETRY = 'true-false:retry',
  RESULT = 'true-false:result',
}

export enum TrueFalseViewState {
  LOADING = 'loading',
  PROGRESS = 'progress',
  RESULT = 'result',
  ERROR = 'error',
}

export enum Action {
  CONFIRM = 'CONFIRM',
  DENY = 'DENY',
}
