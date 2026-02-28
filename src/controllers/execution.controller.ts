import { messages } from '@/common/constants/messages';
import { TerminalLogType, WorkerMessageType } from '@/common/enums/enums';
import { CodeEngineService } from '@/service/code-engine/code-engine.service';
import type { Component } from '@/components/base/component';
import type { CodeEditor } from '@/components/features/code-editor/code-editor.view';
import type { Terminal } from '@/components/features/terminal/terminal.view';
import type { Button } from '@/components/ui/button/button.view';

const laborIllussionTime = 1500;

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

    const runningMessage = messages.terminal.running;
    const runningLog = this.terminal.print(`${runningMessage}.`, TerminalLogType.SYSTEM);
    const runningInterval = this.textAnimation(runningLog, runningMessage);

    try {
      this.runButton.setDisabled(true);
      await new Promise((resolve) => setTimeout(resolve, laborIllussionTime));

      await this.engine.execute(code, this.currentTests, (logMessage, messageType) => {
        const type = messageType === WorkerMessageType.SYSTEM ? TerminalLogType.SYSTEM : TerminalLogType.DEFAULT;
        this.terminal.print(logMessage, type);
      });

      this.terminal.print(messages.terminal.success, TerminalLogType.SUCCESS);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.terminal.print(errorMessage, TerminalLogType.ERROR);
    } finally {
      this.runButton.setDisabled(false);
      clearInterval(runningInterval);
    }
  };

  private textAnimation(textElement: Component, defaultText: string): ReturnType<typeof setInterval> {
    const animationTime = 300;
    const dotsTotal = 3;
    let dots = 1;
    return setInterval(() => {
      dots = (dots % dotsTotal) + 1;
      textElement.setText(`${defaultText}${'.'.repeat(dots)}`);
    }, animationTime);
  }
}
