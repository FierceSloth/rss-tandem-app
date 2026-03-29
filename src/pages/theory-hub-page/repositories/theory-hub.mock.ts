import type { ITheoryHubDto } from '../common/types/types';

export const eventLoopTheoryMock: ITheoryHubDto = {
  id: 'b8e92a10-5c4b-4a3d-8f2e-1b2c3d4e5f6a',
  level_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  title: 'Event Loop & Asynchronous JavaScript',
  description:
    'Before diving into the coding challenges, it is crucial to understand how JavaScript handles asynchronous operations under the hood. Since JS is single-threaded, it relies entirely on the Event Loop to manage concurrency.\n\nPay special attention to the execution priority. You must clearly distinguish between:\n• The `Call Stack` (where your synchronous code executes)\n• `Microtasks` (e.g., `Promise.resolve().then()`, `queueMicrotask()`)\n• `Macrotasks` (e.g., `setTimeout()`, `setInterval()`)\n\nRemember the golden rule: The engine always completely empties the microtask queue before moving on to the next macrotask. Review these carefully selected materials to grasp these concepts thoroughly.',
  materials: [
    {
      title: 'What the heck is the event loop anyway?',
      url: 'https://www.youtube.com/watch?v=8aGhPhV1xO0',
      type: 'video',
      source: 'YouTube',
    },
    {
      title: 'Loupe: Event Loop Visualizer',
      url: 'http://latentflip.com/loupe/',
      type: 'article',
      source: 'Philip Roberts',
    },
    {
      title: 'Event loop: microtasks and macrotasks',
      url: 'https://javascript.info/event-loop',
      type: 'article',
      source: 'javascript.info',
    },
    {
      title: 'Concurrency model and the event loop',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop',
      type: 'article',
      source: 'MDN Web Docs',
    },
  ],
};
