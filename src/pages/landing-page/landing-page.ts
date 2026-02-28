import styles from './landing-page.module.scss';
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';

// import { CodeEditor } from '../../components/features/code-editor/code-editor.view';
// import { Terminal } from '@/components/features/terminal/terminal.view';
// import { Button } from '@/components/ui/button/button.view';
// import { ExecutionController } from '@/controllers/execution.controller';

// const initialCode = `console.log("SYS_START: Инициализация обхода...");

// const targetIP = "192.168.1.104";
// const ports = [80, 443, 8080];

// console.log("Цель захвачена:", targetIP);
// console.log("Открытые порты:", ports);

// // Анализ структуры данных
// const payload = {
//   type: "buffer_overflow",
//   size: 1024,
//   encrypted: true
// };

// console.log("Подготовка payload к отправке:");
// console.log(payload);

// function executeBreach() {
//   console.log(">> Инъекция выполнена <<");
//   return true;
// }

// executeBreach();`;

export class LandingPage implements IPage {
  public render(): Component {
    const landing: Component = new Component({ className: [styles.landing, 'pageContainer'] });

    //   const codeEditor = new CodeEditor({
    //     initialCode: initialCode,
    //     readOnly: false,
    //     showLineNumbers: true,
    //   });
    //   const codeWrapper = new Component({ className: styles.code }, codeEditor);
    //   const terminal = new Terminal({ className: styles.terminal });
    //   const runButton = new Button({ type: 'button', text: 'Run' });

    //   const controller = new ExecutionController(codeEditor, terminal, runButton);
    //   controller.setTests(`
    //   if (typeof executeBreach !== 'function') throw new Error("Функция executeBreach не найдена. Доступ закрыт.");
    //   if (executeBreach() !== true) throw new Error("Инъекция провалилась. Возвращено неверное значение.");
    // `);
    //   landing.append(codeWrapper, terminal, runButton);

    return landing;
  }

  public destroy(): void {}
}
