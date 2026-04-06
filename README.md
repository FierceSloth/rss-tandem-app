# 🚀 RS Tandem App

[![Figma Design](https://img.shields.io/badge/Figma-Design-red?style=for-the-badge&logo=figma)](https://www.figma.com/design/g6Zb6zh7WaxWGElPEHlSy8/Tandem?node-id=0-1&p=f&t=MfehSkjzqKJb7FWs-0)
[![CI/CD Status](https://github.com/fiercesloth/rss-tandem-app/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/fiercesloth/rss-tandem-app/actions/workflows/ci-cd.yml)\
[RSS Tandem App Deploy](https://fiercesloth.github.io/rss-tandem-app)

[RSS Tandem App Checkpoint 5 Preview](https://www.youtube.com/watch?v=gxiUOW3JuBY)

## Записи дневников

[First meet](./development-notes/meets/2026-02-10.md)
[Second meet](./development-notes/meets/2026-02-20.md)
[Third meet](./development-notes/meets/2026-04-06.md)

## 📖 О проекте

**RS Tandem App** — это интерактивная платформа для подготовки к техническим собеседованиям. Проект разрабатывается в рамках финального задания курса RS School.

Ключевая особенность приложения — обучающие виджеты в формате мини-игр, которые разбиты по ключевым темам разработки. Вместо скучной зубрежки теории, пользователи могут прокачивать свои знания, решать задачи и проверять свой код в интерактивном формате. Платформа помогает не просто повторить материал, а закрепить его, систематизировать знания и почувствовать уверенность перед реальными техническими интервью.

## 🛠 Технологический стек

- **Core:** TypeScript, HTML5, SCSS (CSS Modules)
- **Build Tool:** Vite
- **Code Editor:** CodeMirror
- **Architecture:** Custom Component Wrapper, Emitter (Observer pattern), MVC
- **Code Quality:** ESLint, Prettier, Husky, Commitlint, Validate Branch Name

## 👥 Команда разработчиков

- **Diana** (Mentor) — [@dianakhnizova](https://github.com/dianakhnizova)
- **Dastan** (Team Lead / Developer) — [@FierceSloth](https://github.com/FierceSloth)
  - Ссылка на дневники [FierceSloth diaries](./development-notes/fiercesloth/)
- **Oleg** (Developer) — [@coicoin](https://github.com/coicoin)
  - Ссылка на дневники [Oleg diaries](./development-notes/coicoin/)
- **Anna** (Developer) — [@dilmun1101](https://github.com/dilmun1101)
  - Ссылка на дневники [Anna diaries](./development-notes/dilmun1101/)

## 📚 Документация проекта (Developer Guides)

Внутренняя документация для поддержания единого стиля кода и архитектуры:

- [**Git Flow & Collaboration**](./docs/GIT_FLOW.md) — правила работы с ветками, PR и коммитами.
- [**Base Architecture**](./docs/BASE_COMPONENTS.md) — описание базового класса `Component` и работы с глобальной шиной событий `Emitter`.
- [**Component Guideline**](./docs/COMPONENT_GUIDELINE.md) — стандарты создания компонентов (View/Controller) и файловой структуры.
- [**Execution Module**](./docs/EXECUTION_MODULE.md) — архитектура среды выполнения кода: взаимодействие редактора, терминала и изолированного движка (Web Worker) через контроллер.
- [**UI Kit**](./docs/UI_KIT.md) — каталог готовых переиспользуемых интерфейсных элементов.
- [**Router (Navigation)**](./docs/ROUTER.md) — описание работы с роутером.

## Trello

[![Trello Board](https://img.shields.io/badge/Trello-Board-blue?style=for-the-badge&logo=trello)](https://trello.com/b/uoKHXftD/tandem-3103-6-%D0%BD%D0%B5%D0%B4%D0%B5%D0%BB%D1%8C)

[**Trello**](./docs/assets/trello.png)
