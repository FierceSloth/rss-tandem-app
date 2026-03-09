import type { IRoadmapResponse } from './common/types/types';

const MOCK_JSON = `{
  "modules": [
    {
      "title": "FOUNDATION",
      "levels": [
        {
          "id": "lvl_101",
          "widgetType": "QUIZ",
          "title": "Data Structures Basics",
          "description": "Test your knowledge on basic array and string operations.",
          "difficulty": "easy",
          "status": "completed",
          "stars": 3
        },
        {
          "id": "lvl_102",
          "widgetType": "TRUE_FALSE",
          "title": "Async/Await Truths",
          "description": "Separate fact from fiction in asynchronous JavaScript.",
          "difficulty": "medium",
          "status": "active",
          "stars": 0
        },
        {
          "id": "lvl_103",
          "widgetType": "TASK_RESOLVER",
          "title": "Event Loop Implementation",
          "description": "Write a custom implementation of a microtask queue.",
          "difficulty": "hard",
          "status": "locked",
          "stars": 0
        }
      ]
    },
    {
      "title": "ADVANCED CONCEPTS",
      "levels": [
        {
          "id": "lvl_201",
          "widgetType": "VIDEO_TASK",
          "title": "System Design Overview",
          "description": "Watch the architecture breakdown and answer questions.",
          "difficulty": "medium",
          "status": "locked",
          "stars": 0
        },
        {
          "id": "lvl_202",
          "widgetType": "ERROR_SCANNER",
          "title": "Memory Leaks",
          "description": "Find and fix memory leaks in the provided React component.",
          "difficulty": "hard",
          "status": "locked",
          "stars": 0
        },
        {
          "id": "lvl_203",
          "widgetType": "BOSS_BATTLE",
          "title": "The Final Interview",
          "description": "Survive a comprehensive system design mock interview.",
          "difficulty": "expert",
          "status": "locked",
          "stars": 0
        }
      ]
    }
  ]
}`;

export const MOCK_ROADMAP_DATA: IRoadmapResponse = JSON.parse(MOCK_JSON);
