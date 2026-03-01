import { MAX_EXECUTION_TIME } from '@/common/constants/constants';
import { messages } from '@/common/constants/messages';
import { WorkerMessageType } from '@/common/enums/enums';

interface IWorkerMessage {
  type: WorkerMessageType;
  payload?: string;
}

export class CodeEngineService {
  /**
   * The method executes code and runs tests in an isolated sandbox,
   * where all console.log statements are output via an emitter.
   * In case of an error, it returns a
   * Promise with a reject status containing the error.
   *
   * @param {string} code - executable code
   * @param {string} tests - code with tests such as `if (...) throw new Error(...)`
   * @returns {Promise<void>} resolves if all tests pass without errors.
   *
   * @throws {Error} In case of an error in the executable code or failure of tests
   *
   * @example
   * const code = `function sum(a, b) {
   *   return a + b;
   * }`
   *
   * const tests = `
   *  if (typeof sum !== 'function') throw new Error("ReferenceError: Function 'sum' is not defined.");
   *  if (sum(2, 3) !== 5) throw new Error("Assertion failed: Expected sum(2, 3) to return 5.");
   *  if (sum(-1, 1) !== 0) throw new Error("Assertion failed: Expected sum(-1, 1) to return 0.");
   *`
   * await execute(code, test);
   */
  public execute(
    code: string,
    tests: string,
    onLog?: (message: string, type: WorkerMessageType) => void
  ): Promise<void> {
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
              return error instanceof Error ? \`${messages.engine.stringifyError} \${error.message}\` : '${messages.engine.unknownError}';
            }
          }).join(' ');

          self.postMessage({ type: '${WorkerMessageType.LOG}', payload: message });
        };

        try {
          self.postMessage({ type: '${WorkerMessageType.SYSTEM}', payload: '${messages.engine.outputStart}' });
          ${code}
          self.postMessage({ type: '${WorkerMessageType.SYSTEM}', payload: '${messages.engine.testsStart}' });
          ${tests}
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

      worker.addEventListener('message', (event: MessageEvent<IWorkerMessage>) => {
        if (!event) return;
        const { type, payload } = event.data;

        switch (type) {
          case WorkerMessageType.LOG:
          case WorkerMessageType.SYSTEM: {
            if (onLog && payload) {
              onLog(payload, type);
            }
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
        reject(new Error(messages.engine.timeout));
      }, MAX_EXECUTION_TIME);
    });
  }
}
