import type { ILevelData } from './common/types/types';

const ZERO = 0;
// const ONE = 1;
const TWO = 2;
const THREE = 3;

export const MOCK_ROADMAP_DATA: ILevelData[] = [
  {
    id: '1',
    title: 'Data Structures I',
    description: 'Arrays, Strings, and Hash Maps optimization techniques.',
    difficulty: 'easy',
    status: 'completed',
    stars: THREE,
    position: 'left',
  },
  {
    id: '2',
    title: 'Async & Promises',
    description: 'Mastering the event loop, callbacks, and microtask queue.',
    difficulty: 'medium',
    status: 'completed',
    stars: TWO,
    position: 'right',
  },
  {
    id: '3',
    title: 'Data Structures I',
    description: 'Arrays, Strings, and Hash Maps optimization techniques.',
    difficulty: 'easy',
    status: 'completed',
    stars: THREE,
    position: 'center',
  },
  {
    id: '3',
    title: 'System Design I',
    description: 'Load balancers, caching strategies, and database sharding.',
    difficulty: 'hard',
    status: 'active',
    stars: ZERO,
    position: 'left',
  },
  {
    id: '4',
    title: 'Distributed Systems',
    description: 'CAP theorem, consistency patterns, and consensus algorithms.',
    difficulty: 'expert',
    status: 'locked',
    stars: ZERO,
    position: 'right',
  },
  {
    id: '5',
    title: 'Security & Auth',
    description: 'OAuth, JWT, hashing strategies, and common vulnerabilities.',
    difficulty: 'medium',
    status: 'locked',
    stars: ZERO,
    position: 'center',
  },
];
