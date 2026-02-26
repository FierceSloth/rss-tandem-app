import { WorkerMessageType } from '@/common/enums/enums';

interface IWorkerMessage {
  type: WorkerMessageType;
  payload?: string;
}

const timeToTry = 3000;

export class CodeEngineService {
  public execute(code: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const workerString = `
        const originalLog = console.log;

        console.log = (...args) => {
          const message = args.map((argument) => {
            if (argument === null || argument === undefined) return String(argument);
            if (['string', 'number', 'boolean', 'symbol', 'bigint'].includes(typeof argument)) return String(argument);
            if (typeof argument === 'function') return argument.toString();
            try {
              return JSON.stringify(argument);
            } catch (error) {
              return error instanceof Error ? \`[Error stringifying object: \${error.message}]\` : '[Unknown Error]';
            }
          }).join(' ');

          self.postMessage({ type: '${WorkerMessageType.LOG}', payload: message });
        };

        try {
          ${code}
          self.postMessage({ type: '${WorkerMessageType.SUCCESS}' });
        } catch (error) {
          if (error instanceof Error) {
            self.postMessage({ type: '${WorkerMessageType.ERROR}', payload: error.message });
          } else {
            self.postMessage({ type: '${WorkerMessageType.ERROR}', payload: String(error) });
          }
        }
      `;

      const blob = new Blob([workerString], { type: 'application/javascript' });
      const workerUrl = URL.createObjectURL(blob);

      const worker = new Worker(workerUrl);

      let timer: ReturnType<typeof setTimeout>;

      const cleanup = (): void => {
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
        clearTimeout(timer);
      };

      worker.addEventListener('message', (event) => {
        if (!event) return;
        const { type, payload } = event.data as IWorkerMessage;

        switch (type) {
          case WorkerMessageType.LOG: {
            // TODO: send logs to the terminal using the emitter
            break;
          }
          case WorkerMessageType.SUCCESS: {
            cleanup();
            resolve();
            break;
          }
          case WorkerMessageType.ERROR: {
            cleanup();
            reject(new Error(payload));
            break;
          }
        }
      });

      timer = setTimeout(() => {
        cleanup();
        reject(new Error('Execution Timeout: Code took too long to run.'));
      }, timeToTry);
    });
  }
}
