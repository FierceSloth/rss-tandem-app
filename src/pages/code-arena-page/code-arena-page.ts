import type { IPage } from '@/common/types/types';
import type { ICodeArenaEntities } from './common/types/types';
import { Component } from '@/components/base/component';
import { CodeEditor } from '@/components/features/code-editor/code-editor.view';
import { Terminal } from '@/components/features/terminal/terminal.view';
import { Button } from '@/components/ui/button/button.view';
import { CodeArenaHeader } from './components/layout/code-arena-header/code-arena-header.view';
import { CodeArenaFooter } from './components/layout/code-arena-footer/code-arena-footer.view';
import { CodeArenaController } from './code-arena-page.controller';
import { messages } from './common/constants/messages';

import styles from './code-arena-page.module.scss';
import { LoaderManager } from '@/common/utils/loader-manager.util';
import { InlineCodeText } from '@/components/ui/inline-code-text/inline-code-text.view';
import { Score } from '@/components/features/score/score.view';

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

  private root = new Component({ className: styles.codeArena });
  private loader = new LoaderManager();
  private controller: CodeArenaController | null = null;

  private workspace: Component | null = null;
  private resultView: Score | null = null;

  public render(): Component {
    this.controller = new CodeArenaController(this);
    return this.root;
  }

  public destroy(): void {
    this.controller?.destroy();
  }

  public showLoading(): void {
    this.loader.show('lg', 'green');
  }

  public hideLoading(): void {
    this.loader.hide();
  }

  public setReady(): void {
    this.root.addClass('showAnimation');
  }

  public renderLayout(entity: ICodeArenaEntities): void {
    const header = new CodeArenaHeader({ titleText: entity.title, topicText: entity.topic });
    const footer = new CodeArenaFooter({});
    this.workspace = this.buildWorkspace(entity);

    this.root.append(header, this.workspace, footer);
  }

  public showResult(): void {
    if (this.workspace) {
      this.workspace.node.style.display = 'none';
    }
    this.resultView = new Score({ className: styles.score, scoreData: { correct: 1, total: 1 }, withButtons: true });
    this.workspace?.node.after(this.resultView.node);
  }

  private buildWorkspace(entity: ICodeArenaEntities): Component {
    const workspace = new Component({ className: styles.workspace });

    const descriptionInner = new Component({ className: styles.panelContent });
    const descText = new InlineCodeText({ tag: 'p', text: entity.description });
    descriptionInner.append(descText);

    const descriptionPanel = this.buildPanel(styles.descriptionPanel, messages.headers.description, descriptionInner);

    const editorInner = new Component({ className: styles.panelContent }, this.editor);

    const editorPanel = this.buildPanel(styles.editorPanel, messages.headers.solution, editorInner);

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
