# 💻 Модуль Выполнения Кода (Code Execution)

Модуль выполнения кода — это изолированная среда для безопасного запуска пользовательского JavaScript-кода в браузере, проверки его тестами и визуального вывода результатов.

Система построена по паттерну **MVC** и строго следует нашему компонентному подходу.

## 🏗 Архитектура модуля

Модуль состоит из 4 основных сущностей:

1. **`CodeEditor` (View)** — Редактор кода на базе CodeMirror. "Глупый" компонент (без бизнес-логики), умеет только отдавать и принимать текст.
2. **`Terminal` (View)** — Визуальная консоль. Умеет печатать строки с разными цветами (`DEFAULT`, `SYSTEM`, `SUCCESS`, `ERROR`) и автоматически скроллиться вниз.
3. **`CodeEngineService` (Service)** — Изолированная "песочница" (Web Worker). Берет код, выполняет его, перехватывает `console.log` и возвращает Promise.
4. **`ExecutionController` (Controller)** — Дирижер модуля. Связывает редактор, кнопку запуска и терминал с движком. Обрабатывает логику "Иллюзии труда" (задержки и анимации загрузки) для улучшения UX.

---

## 🚀 Как использовать на странице

⚠️ **Архитектурное правило:** Согласно нашим гайдлайнам, мы строго разделяем View и Controller. **Никогда не пишите бизнес-логику (запросы к API, проверки тестов) внутри класса Страницы.** Страница должна быть "глупой" и отвечать только за View.

Чтобы добавить выполнение кода (например, на `TaskResolvePage`), разделите логику на два файла:

### Часть 1: Файл Страницы (View) — только верстка

Создайте UI-компоненты, сделайте их публичными (чтобы Контроллер имел к ним доступ) и соберите макет.

```typescript
import type { IPage } from '@/common/types/types';
import { Component } from '@/components/base/component';
import { CodeEditor } from '@/components/features/code-editor/code-editor.view';
import { Terminal } from '@/components/features/terminal/terminal.view';
import { Button } from '@/components/ui/button/button.view';

import styles from './task-resolver-page.module.scss';

export class TaskResolverPage implements IPage {
  // Публичные свойства для доступа из контроллера
  public editor!: CodeEditor;
  public terminal!: Terminal;
  public runButton!: Button;

  private root!: Component;
  private controller: TaskResolvePageController;

  public render(): Component {
    // Инициализируем компоненты (View)
    this.root = new Component({ className: [styles.taskResolver, 'pageContainer'] });

    this.editor = new CodeEditor({
      className: styles.editor,
      initialCode: '// Напишите ваше решение...',
    });

    this.terminal = new Terminal({ className: styles.terminal });

    this.runButton = new Button({
      text: 'RUN CODE',
      variant: 'primary',
      className: styles.runButton,
    });

    // Создаем структуру
    const mainSplit = new Component({ className: styles.mainSplit });

    // Панель редактора
    const editorPanel = new Component({ className: styles.panelEditor }, this.editor);

    // Панель консоли и управления
    const consolePanel = new Component({ className: styles.panelConsole }, this.terminal);
    const actionsPanel = new Component({ className: styles.panelActions }, this.runButton);

    // Собираем всё в дерево
    mainSplit.append(editorPanel, consolePanel);
    this.root.append(mainSplit, actionsPanel);

    this.controller = new TaskResolvePageController(this);

    return this.root;
  }

  public destroy(): void {
    // Удаление контроллеров
    this.root.destroy();
  }
}
```

### Часть 2: Файл Контроллера Страницы (Controller) — бизнес-логика

В контроллере мы получаем доступ к элементам страницы, загружаем тесты с бэкенда и передаем всё это в глобальный `ExecutionController`.

```typescript
// task-resolve.controller.ts
import { ExecutionController } from '@/controllers/execution.controller';

export class TaskResolvePageController {
  private view: TaskResolvePage;
  private executionController: ExecutionController;

  constructor(view: TaskResolvePage) {
    this.view = view;

    // 1. Инициализируем контроллер выполнения, передавая сами компоненты (не обертки!)
    this.executionController = new ExecutionController(this.view.editor, this.view.terminal, this.view.runButton);

    this.loadTaskData();
  }

  private loadTaskData(): void {
    // 2. Загружаем тесты (например, с бэкенда)
    const taskTests = `
      if (typeof sum !== 'function') throw new Error("Функция sum не найдена!");
      if (sum(2, 3) !== 5) throw new Error("Ожидалось 5, но получено другое значение.");
    `;

    // 3. Передаем тесты в глобальный ExecutionController
    this.executionController.setTests(taskTests);
  }
}
```

---

## 🧪 Формат написания тестов

Тесты для движка — это обычный JavaScript-код, который выполняется **сразу после** кода пользователя в том же контексте.

**Правила написания тестов:**

1. Не используйте сторонние библиотеки (Jest, Mocha и т.д.).
2. Проверка осуществляется через стандартный `if (...)`.
3. Если тест провален, необходимо выбросить ошибку: `throw new Error('Текст ошибки')`. Текст ошибки будет выведен в Терминал красным цветом.

**Пример тестов:**

```javascript
// Код пользователя:
// function getArray() { return [1, 2]; }

// Строка тестов:
`
  if (typeof getArray !== 'function') {
    throw new Error("Функция getArray не найдена.");
  }
  
  const result = getArray();
  
  // ВАЖНО: Массивы и объекты в JS сравниваются по ссылке. 
  // Используйте JSON.stringify для проверки их содержимого.
  if (JSON.stringify(result) !== JSON.stringify([1, 2])) {
    throw new Error("Тест провален: ожидалось [1, 2].");
  }
`;
```

---

_Документацию сгенерировал Gemini 3.1 Pro и отредактировал FierceSloth_
