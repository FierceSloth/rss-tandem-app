import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { CodeEditor } from '@/components/features/code-editor/code-editor.view';
import { Terminal } from '@/components/features/terminal/terminal.view';
import { Button } from '@/components/ui/button/button.view';
import { CodeArenaHeader } from './components/layout/code-arena-header/code-arena-header.view';
import { CodeArenaFooter } from './components/layout/code-arena-footer/code-arena-footer.view';
// import { CodeArenaController } from './code-arena.controller';
import { messages } from './common/constants/messages';

import styles from './code-arena-page.module.scss';

const MOCK_TEXT = {
  title: 'JavaScript Basics',
  descritpion:
    'Deep dive into the microtask queue, call stack, and non-blocking I/O operations. Predict the execution order of the provided queue.',
};

export class CodeArenaPage implements IPage {
  public readonly editor = new CodeEditor({ className: styles.editor });
  public readonly terminal = new Terminal({ className: styles.terminal });

  public readonly runButton = new Button({
    className: styles.runButton,
    text: messages.buttons.run,
    variant: 'ghost',
  });
  public readonly submitButton = new Button({
    className: styles.submitButton,
    text: messages.buttons.submit,
    variant: 'primary',
  });

  // private controller: CodeArenaController | null = null;

  public render(): Component {
    const root = new Component({ className: styles.codeArena });

    const header = new CodeArenaHeader({ titleText: MOCK_TEXT.title });
    const footer = new CodeArenaFooter({});
    const workspace = this.createWorkspace();

    root.append(header, workspace, footer);

    // this.controller = new CodeArenaController(this);

    return root;
  }

  public destroy(): void {
    // this.controller?.destroy();
  }

  private createWorkspace(): Component {
    const workspace = new Component({ className: styles.workspace });

    const descriptionPanel = new Component({ className: [styles.panel, styles.descriptionPanel] });
    const descText = new Component({ tag: 'p', text: MOCK_TEXT.descritpion });
    descriptionPanel.append(descText);

    const editorPanel = new Component({ className: [styles.panel, styles.editorPanel] }, this.editor);

    const consolePanel = new Component({ className: [styles.panel, styles.consolePanel] });
    const terminalWrapper = new Component({ className: styles.terminalWrapper }, this.terminal);
    const actionsContainer = new Component({ className: styles.actionsContainer }, this.runButton, this.submitButton);

    consolePanel.append(terminalWrapper, actionsContainer);

    workspace.append(descriptionPanel, editorPanel, consolePanel);
    return workspace;
  }
}
