import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { CodeEditor } from '@/components/features/code-editor/code-editor.view';
import { Terminal } from '@/components/features/terminal/terminal.view';
import { Button } from '@/components/ui/button/button.view';
import { CodeArenaHeader } from './components/layout/code-arena-header/code-arena-header.view';
import { CodeArenaFooter } from './components/layout/code-arena-footer/code-arena-footer.view';
import { CodeArenaController } from './code-arena-page.controller';
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

  private controller: CodeArenaController | null = null;

  public render(): Component {
    const root = new Component({ className: styles.codeArena });

    const header = new CodeArenaHeader({ titleText: MOCK_TEXT.title });
    const footer = new CodeArenaFooter({});
    const workspace = this.buildWorkspace();

    root.append(header, workspace, footer);

    this.controller = new CodeArenaController(this);

    return root;
  }

  public destroy(): void {
    this.controller?.destroy();
  }

  private buildWorkspace(): Component {
    const workspace = new Component({ className: styles.workspace });

    const descriptionInner = new Component({ className: styles.panelContent });
    const descText = new Component({ tag: 'p', text: MOCK_TEXT.descritpion });
    descriptionInner.append(descText);

    const descriptionPanel = this.buildPanel(styles.descriptionPanel, messages.headers.description, descriptionInner);

    const editorInner = new Component({ className: styles.panelContent }, this.editor);

    const editorPanel = this.buildPanel(styles.editorPanel, messages.headers.soultion, editorInner);

    const consoleInner = new Component({ className: styles.panelContent });
    const terminalWrapper = new Component({ className: styles.terminalWrapper }, this.terminal);
    const actionsContainer = new Component({ className: styles.actionsContainer }, this.runButton, this.submitButton);
    consoleInner.append(terminalWrapper, actionsContainer);

    const consolePanel = this.buildPanel(styles.consolePanel, messages.headers.output, consoleInner);

    workspace.append(descriptionPanel, editorPanel, consolePanel);
    return workspace;
  }

  private buildPanel(className: string, headerText: string, inner: Component): Component {
    const panel = new Component({ tag: 'section', className: [styles.panel, className] });
    const header = new Component({ tag: 'header', className: styles.panelHeader, text: headerText });

    panel.append(header, inner);

    return panel;
  }
}
