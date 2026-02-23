import { AboutPage } from '@/pages/about-page/about-page';
import { AuthPage } from '@/pages/auth-page/auth-page';
import { BossBattlePage } from '@/pages/boss-battle-page/boss-battle-page';
import { DashboardPage } from '@/pages/dashboard-page/dashboard-page';
import { ErrorScannerPage } from '@/pages/error-scanner-page/error-scanner-page';
import { LandingPage } from '@/pages/landing-page/landing-page';
import { LevelSelectionPage } from '@/pages/level-selection-page/level-selection-page';
import { NotFoundPage } from '@/pages/not-found-page/not-found-page';
import { OutputPredictorPage } from '@/pages/output-predictor-page/output-predictor-page';
import { QuizPage } from '@/pages/quiz-page/quiz-page';
import { TaskResolverPage } from '@/pages/task-resolver-page/task-resolver-page';
import { TrueFalsePage } from '@/pages/true-false-page/true-false-page';
import { UserProfilePage } from '@/pages/user-profile-page/user-profile-page';
import { VideoTaskResolverPage } from '@/pages/video-task-resolver-page/video-task-resolver-page';
import type { IRoute } from './types';
import { ROUTES } from './constants';

export const routes: IRoute[] = [
  /* Permitted */
  { path: ROUTES.LANDING_PAGE, page: () => new LandingPage(), meta: { secured: false } },
  { path: ROUTES.ABOUT_PAGE, page: () => new AboutPage(), meta: { secured: false } },
  { path: ROUTES.AUTH_PAGE, page: () => new AuthPage(), meta: { secured: false } },
  { path: ROUTES.NOT_FOUND_PAGE, page: () => new NotFoundPage(), meta: { secured: false } },
  /* Secured */
  { path: ROUTES.DASHBOARD_PAGE, page: () => new DashboardPage(), meta: { secured: true } },
  { path: ROUTES.USER_PROFILE_PAGE, page: () => new UserProfilePage(), meta: { secured: true } },
  { path: ROUTES.LEVEL_SELECTION_PAGE, page: () => new LevelSelectionPage(), meta: { secured: true } },
  { path: ROUTES.QUIZ_PAGE, page: () => new QuizPage(), meta: { secured: true } },
  { path: ROUTES.TRUE_FALSE_PAGE, page: () => new TrueFalsePage(), meta: { secured: true } },
  { path: ROUTES.TASK_RESOLVER_PAGE, page: () => new TaskResolverPage(), meta: { secured: true } },
  { path: ROUTES.VIDEO_TASK_PAGE, page: () => new VideoTaskResolverPage(), meta: { secured: true } },
  { path: ROUTES.OUTPUT_PREDICATOR_PAGE, page: () => new OutputPredictorPage(), meta: { secured: true } },
  { path: ROUTES.BOSS_BATTLE_PAGE, page: () => new BossBattlePage(), meta: { secured: true } },
  { path: ROUTES.ERROR_SCANNER_PAGE, page: () => new ErrorScannerPage(), meta: { secured: true } },
];
