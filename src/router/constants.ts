export const ROUTES = {
  LANDING_PAGE: '/',
  ABOUT_PAGE: '/about',
  AUTH_PAGE: '/auth',

  DASHBOARD_PAGE: '/dashboard',
  USER_PROFILE_PAGE: '/profile',
  LEVEL_SELECTION_PAGE: '/levels',

  QUIZ_PAGE: '/quiz/:id',
  TRUE_FALSE_PAGE: '/true-false/:id',
  TASK_RESOLVER_PAGE: '/task-resolver/:id',
  VIDEO_TASK_PAGE: '/video-task/:id',
  OUTPUT_PREDICATOR_PAGE: '/output-predictor/:id',
  BOSS_BATTLE_PAGE: '/boss-battle/:id',
  ERROR_SCANNER_PAGE: '/error-scanner/:id',

  NOT_FOUND_PAGE: '/not-found',
} as const;
