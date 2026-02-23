# Git Flow & Collaboration Standards

В этом проекте мы придерживаемся строгих стандартов RS School.

## Навигация

- [1. Naming Convention: Ветки](#1-naming-convention-ветки)
- [2. Commit Convention (Рабочие коммиты)](#2-commit-convention-рабочие-коммиты)
- [3. Pull Request Title & Squash Commit](#3-pull-request-title--squash-commit)
- [4. Pull Request Template](#4-pull-request-template)
- [5. Development Diary: Работа с дневниками](#5-работа-с-дневниками-development-diary)

## 1. Naming Convention: Ветки

Мы используем формат веток, привязанный к ID задач в Trello.

**Формат:**
`type/RSS-TD-ID_description`

- **type**: Тип изменений (feat, fix, refactor и т.д.)
- **RSS-TD-ID**: ID задачи из доски (например, `RSS-TD-25`).
- **RSS-CORE-00**: Если у задачи нет ID (или это инициализация), используем `00`.
- **\_description**: Описание задачи.
  - **Стиль:** `camelCase` (слитное написание, каждое слово с большой буквы, кроме первого).
  - **Грамматика:** Imperative Mood + Present Tense (как в коммитах).
  - _Пример:_ ✅`addLoginLayout`, а не ❌`addingLoginLayout` или ❌`added-login-layout`.

**Примеры:**

- ✅ `feat/RSS-TD-14_addLoginLayout` (Задача №14: Добавить верстку логина)
- ✅ `fix/RSS-TD-05_fixHeaderResponsive` (Фикс №5: Починить адаптив хедера)
- ✅ `chore/RSS-CORE-00_initProjectStructure` (Инициализация структуры)
- ✅ `refactor/RSS-TD-12_renameUserInterface` (Рефакторинг интерфейса)

---

## 2. Commit Convention (Рабочие коммиты)

Названия обычных коммитов внутри ветки должны быть согласно [RS School Guideline](https://rs.school/ru/docs/git-convention).

### Основные правила:

1.  **Только нижний регистр** для типа (`feat`, `fix`, `refactor`...).
2.  **Present Tense** ("add feature", NOT "added feature").
3.  **Imperative Mood** ("move cursor to...", NOT "moves cursor to...").
4.  **No Period:** Не ставьте точку в конце заголовка.

### Типы коммитов и примеры:

#### `init:`

Используется для начала проекта или таска.

- `init: start youtube-task`

#### `feat:`

Реализованная новая функциональность.

- `feat: add basic page layout`
- `feat: implement request to youtube API`

#### `fix:`

Исправление ошибки в ранее реализованной функциональности.

- `fix: implement correct loading data`
- `fix: relayout header for firefox`

#### `refactor:`

Улучшение кода без смены логики.

- `refactor: change structure of the project`
- `refactor: rename vars for better readability`

#### `docs:`

Изменения в документации.

- `docs: update readme with additional information`

#### `style:`

Изменения стиля (пробелы, форматирование).

- `style: format code with prettier`

#### `chore:`

Конфиги, сборка.

- `chore: add .editorconfig file`

---

## 3. Pull Request Title & Squash Commit

При завершении задачи мы используем стратегию **Squash & Merge**.

**Название вашего Pull Request** должно строго соответствовать следующему формату:

**Формат:**
`type: RSS-TD-ID description`

_(GitHub автоматически добавит номер PR `(#ID)` в конец заголовка финального коммита)_

**Правила:**

1.  **Если есть задача в Trello:** Используем реальный ID.
2.  **Если задачи нет (глобальный фикс/настройка):** Используем `RSS-CORE-00`.

**Примеры (как называть PR):**

- ✅ `feat: RSS-TD-25 implement login form logic`
  _(В истории станет: `feat: RSS-TD-25 implement login form logic (#26)`)_
- ✅ `fix: RSS-TD-12 fix header styles on mobile`
- ✅ `docs: RSS-CORE-00 update git flow documentation`
- ✅ `chore: RSS-CORE-00 setup eslint and prettier`

⚠️ **Важно:** Описание (`description`) должно быть кратким, на английском языке и в повелительном наклонении (Imperative mood).

### Описание (Body) Squash-коммита

При слиянии (Merge) GitHub автоматически предлагает список всех коммитов ветки в качестве описания.
**Мы НЕ оставляем этот список.**

**Как правильно:**

1.  Удалите список промежуточных коммитов (`feat:...`, `fix:...`, `chore:...`...).
2.  Оставьте краткий маркированный список реально сделанных изменений (можно взять из Summary вашего PR и изменить под стиль).

**Пример хорошего описания:**

```text
- Create LoginForm component
- Add API service for auth
- Update global styles
```

---

## 4. Pull Request Template

Каждый PR должен иметь подробное описание. Используйте этот шаблон:

```markdown
# 📋 Trello Task ID

- [ ] **RSS-TD-##** (Task ID)
- [ ] **No ID** (Global fix or chore)

# ⚡️ Summary

_Write a short report on the work done here. What problem does this PR solve?_

# 🛠 Type of change

- [ ] `feat` (New feature)
- [ ] `fix` (Bug fix)
- [ ] `refactor` (Code improvement / Refactoring without changing logic)
- [ ] `style` (Formatting, CSS)
- [ ] `docs` (Documentation)
- [ ] `chore` (Configs, Build)

# 🧪 How Has This Been Tested?

- [ ] **Manual Testing** (Interface interaction)

**Browsers / Devices:**

- [ ] Chrome
- [ ] Mobile (Responsive)

# 📷 Screenshots / GIFs

_REQUIRED for UI changes. Attach images or GIFs here. If no UI changes, delete this section._

# ✅ Checklist:

- [ ] My code follows the **Code Standards** of this project
- [ ] I have performed a **self-review** of my own code
- [ ] I have used **semantic naming** for variables/functions (camelCase)
- [ ] My changes generate **no new warnings** in the console
- [ ] I have removed `console.log` (except for critical error logging)
```

## 5. Development Diary: Работа с дневниками

### Правила ведения:

1. **Единая ветка `diary`:** Мы не создаем новые ветки под каждую неделю. Для ведения дневников используется одна общая постоянная ветка `diary`. Никогда не пишите продуктовый код фичи и дневник в одной ветке.
2. **Ежедневные коммиты:** Своя запись должна коммититься в тот же или на следующий день. _(Совет: перед созданием коммита делайте `git pull`, так как ветка общая для всей команды)._
3. **Формат коммита:** Строго используйте шаблон `docs: add diary entry for YYYY-MM-DD`.
   - _Пример:_ `docs: add diary entry for 2026-02-24`
4. **Слияние (Merge):** При создании PR из ветки `diary` в основную ветку **ЗАПРЕЩЕНО** использовать `Squash and merge`. Используйте только:
   - **Rebase and merge** (предпочтительно, сохраняет плоскую историю)
   - **Create a merge commit**
