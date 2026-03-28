import type { ITheoryHubDto } from '../common/types/types';

export const eventLoopTheoryMock: ITheoryHubDto = {
  id: 'b8e92a10-5c4b-4a3d-8f2e-1b2c3d4e5f6a',
  level_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  title: 'Event Loop & Asynchronous JavaScript',
  description:
    'Before diving into the coding challenges, it is crucial to understand how JavaScript handles asynchronous operations under the hood. Review these carefully selected materials to grasp the concepts of the Call Stack, Web APIs, Task Queue, and Microtasks.',
  materials: [
    {
      title: 'What the heck is the event loop anyway?',
      url: 'https://www.youtube.com/watch?v=8aGhPhV1xO0',
      type: 'video',
      source: 'YouTube',
    },
    {
      title: 'Событийный цикл: микрозадачи и макрозадачи',
      url: 'https://learn.javascript.ru/event-loop',
      type: 'article',
      source: 'learn.javascript.ru',
    },
    {
      title: 'Concurrency model and the event loop',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop',
      type: 'article',
      source: 'MDN Web Docs',
    },
  ],
};
