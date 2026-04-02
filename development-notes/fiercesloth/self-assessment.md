# Self-Assessment

**Ссылка на PR:** https://github.com/FierceSloth/rss-tandem-app/pull/55

## 1. Реализованные фичи (Итого: 185 баллов)

- **[My Components] Сложный бэкенд-сервис (+30 баллов)**
  - Code Execution Sandbox: Изолированная среда для выполнения пользовательского кода. Реализована полная изоляция через WebWorker и Blob с перехватом событий консоли (Monkey Patching). Хоть и не сделан на стороне сервера, но подходит под критерий. [PR #16](https://github.com/FierceSloth/rss-tandem-app/pull/16)
- **[My Components] Complex Component (+25 баллов)**
  - CodeArena: Интерактивная среда-виджет (аналог CodeWars), объединяющая редактор кода, терминал вывода и систему тестирования. [PR #49](https://github.com/FierceSloth/rss-tandem-app/pull/49)
- **[My Components] Complex Component (+25 баллов)**
  - Roadmap: Страница со сложным стейтом (locked, active, completed). Включает сложный расчет динамической линии прогресса [PR #40](https://github.com/FierceSloth/rss-tandem-app/pull/40)
- **[My Components] Rich UI Screen (+20 баллов)**
  - TheoryHub: Страница теории (хаб обучающих материалов), реализована верстка и базовая логика с использованием мапперов DTO. [PR #54](https://github.com/FierceSloth/rss-tandem-app/pull/54)
- **[Backend & Data] BaaS CRUD (+15 баллов)**
  - Интеграция БД Supabase: Реализовано сохранение прогресса пользователя, чтение данных с бд на страницах `Roadmap`, `CodeArena` и `TheoryHub`.
- **[UI & Interaction] Code Editor (+15 баллов)**
  - CodeMirror: Внедрение и кастомизация редактора кода (добавлены пропсы `readOnly`, `typeScript`, `showLineNumbers`), решены проблемы с версткой flex-контейнеров. [PR #16](https://github.com/FierceSloth/rss-tandem-app/pull/16)
- **[Architecture] API Layer (+10 баллов)**
  - Выделение слоя работы с API: Созданы `Repository` и утилиты `Mapper` для изоляции работы с сетью и перевода данных из snake_case (с бэкенда) в camelCase (на клиенте) для страниц `Roadmap`, `CodeArena` и `TheoryHub`.
- **[Architecture] Design Patterns (+10 баллов)**
  - Архитектурные паттерны: Явное использование MVC (Controller + View), Observer (кастомный класс Emitter для событий), Singleton, Repository и Mapper.
- **[DevOps & Role] Architect (+10 баллов)**
  - Документирование архитектурных решений: Написана подробная документация по базовым абстракциям (Component, Emitter), правилам написания MVC-компонентов и архитектуре модуля выполнения кода. В документации присутствуют архитектурные схемы и обоснования выбранных паттернов. [PR #6](https://github.com/FierceSloth/rss-tandem-app/pull/6) [PR #12](https://github.com/FierceSloth/rss-tandem-app/pull/12)
- **[UI & Interaction] Advanced Animations (+10 баллов)**
  - UI/UX: Разработаны кастомные анимированные Toast и Spinner. Реализованы ховер-анимации карточек и паттерн "Labor Illusion" (иллюзия труда) в терминале для улучшения пользовательского опыта.
- **[Quality] Unit Tests (Basic) (+10 баллов)**
  - Тестирование: Написаны юнит-тесты (с использованием vitest) для утилиты `RoadmapMapper`. [PR #40](https://github.com/FierceSloth/rss-tandem-app/pull/40)
- **[UI & Interaction] Responsive (+5 баллов)**
  - Адаптивность: Реализована адаптивная верстка для всех страниц.

### Другие фичи, которых нет в критериях

- **Design**
  - Дизайн всей страниц и всего приложения. [Figma](https://www.figma.com/design/g6Zb6zh7WaxWGElPEHlSy8/Tandem?node-id=0-1&p=f&t=FQG2SPNkf53TWuf8-0)
- **UI Kit**
  - Создание базовых переиспользуемых компонентов (Button, Input, Card, StatusBadge, Toast, Spinner). [PR #3](https://github.com/FierceSloth/rss-tandem-app/pull/3) [PR #39](https://github.com/FierceSloth/rss-tandem-app/pull/39)
- **Repo Setup**
  - Создание репозитория, настройка линтеров, защита веток\*.
- **ExecutionController**
  - Глобальный контроллер, обьеденяющий 4 элемента: `CodeEditor`, `Terminal`, `RunButton` и `CodeEngineService`. Так же занимается логгированием для обозначений вывода и начала тестов.\*. [PR #16](https://github.com/FierceSloth/rss-tandem-app/pull/16)
- **PageLayout**
  - Универсальная обертка для всех страниц, которая ограничивает контент, добавляет `Sidebar` при надобности и Размещает `Header` и `Footer` во весь экран, не ограничивая их.\*. [PR #30](https://github.com/FierceSloth/rss-tandem-app/pull/30)

## 2. Описание проделанной работы

В рамках проекта Tandem я прошел путь от создания базовых UI-атомов до проектирования сложных интерактивных страниц и сервисов слоя выполнения кода.

Моей главной задачей было создание стабильной архитектуры на фронтенде без использования фреймворков. Я отказался от жестких глобальных ограничений сетки в пользу универсального и гибкого компонента `PageLayout`, который с помощью CSS Grid сам адаптируется под наличие сайдбара и контента.

Также я занимался:

- Созданием страницы `Roadmap` для плавной прогресси пользователя.
- Разработкой страницы-виджета `TheoryHub` для плавной прогресси пользователя.
- Разработкой интерактивной страницы-виджета `CodeArena`, которая эмулирует работу CodeWars.
- Интеграцией библиотеки CodeMirror, для которой пришлось решать нестандартные баги с отображением скролла на flex-верстке.
- Интеграцией БД Supabase и созданием DTO-мапперов для приведения данных к единому стилю (camelCase) на клиенте.
- Рефакторингом и написанием глобальных контроллеров для переиспользования логики (например, `ExecutionController` и `ProgressService`).

## 3. Два личных Feature Component (для защиты)

В качестве компонентов, разработанных мной лично, я хочу выделить следующие:

### 1. Страница `Roadmap` (Rich UI Screen)

Сложная страница со множеством состояний (locked, active, completed).

### 2. Интерактивная среда `CodeArena` и `ExecutionController` (Rich UI Screen)

Интерактивная среда-виджет (аналог CodeWars), объединяющая редактор кода, терминал вывода и систему тестирования. С глобальным контроллером, спроектированный для переиспользования во всех виджетах, где нужен запуск кода. Контроллер связывает 4 изолированных элемента: `CodeEditor` (View), `Terminal` (View), `RunButton` (View) и изолированный WebWorker-движок выполнения кода (`CodeEngineService`).

### 3. `CodeEngine` (Движок для изолированного запуска кода)

Хоть и этот компонент написан мной, но некоторую часть логики было написано с помощью ИИ, так как компонент был тяжелым в реализации, и пришлось прибегнуть к помощи. Но все равно готов поотвечать на вопросы на счет его реализации.
