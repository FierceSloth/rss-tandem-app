import { messages } from '@/common/constants/messages';
import { TerminalLogType, WorkerMessageType } from '@/common/enums/enums';
import type { CodeEditor } from '@/components/features/code-editor/code-editor.view';
import type { Terminal } from '@/components/features/terminal/terminal.view';
import type { Button } from '@/components/ui/button/button.view';
import { CodeEngineService } from '@/service/code-engine/code-engine.service';

export class ExecutionController {
  private codeEditor: CodeEditor;
  private terminal: Terminal;
  private runButton: Button;
  private engine: CodeEngineService;

  private currentTests: string | null = null;

  constructor(codeEditor: CodeEditor, terminal: Terminal, runButton: Button) {
    this.codeEditor = codeEditor;
    this.terminal = terminal;
    this.runButton = runButton;

    this.engine = new CodeEngineService();

    this.initListeners();
  }

  public setTests(tests: string): void {
    this.currentTests = tests;
    this.terminal.clear();
    this.terminal.print(messages.terminal.ready, TerminalLogType.SYSTEM);
  }

  private initListeners(): void {
    this.runButton.addListener('click', () => {
      void this.runHandler();
    });
  }

  private runHandler = async (): Promise<void> => {
    if (!this.currentTests) {
      this.terminal.print(messages.terminal.testsNotSet, TerminalLogType.ERROR);
      return;
    }

    const code = this.codeEditor.getValue();

    this.terminal.clear();
    this.terminal.print(messages.terminal.running, TerminalLogType.SYSTEM);

    try {
      await this.engine.execute(code, this.currentTests, (logMessage, messageType) => {
        const type = messageType === WorkerMessageType.SYSTEM ? TerminalLogType.SYSTEM : TerminalLogType.DEFAULT;
        this.terminal.print(logMessage, type);
      });

      this.terminal.print(messages.terminal.success, TerminalLogType.SUCCESS);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.terminal.print(errorMessage, TerminalLogType.ERROR);
    }
  };
}
