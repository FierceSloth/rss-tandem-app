# Router — Спецификация

## Навигация

- [Общая архитектура](#общая-архитектура)
  - [Инициализация роутера](#инициализация-роутера)
  - [Навигация](#навигация)
  - [Flow навигации](#flow-навигации-handleroute)
  - [Path и Query](#path-и-query)
  - [История](#history)
  - [Security](#security)
  - [Render](#render)
  - [Lifecycle страницы](#lifecycle-страницы)
- [Работа с роутером](#работа-с-роутером)
  - [Используемые хуки](#используемые-хуки)
  - [Пример реализации LandingPage и QuizPage](#пример-реализации-quizpage)

---

## Общая архитектура

`Router` — SPA-навигация на **History API** с поддержкой:

- `push`, `replace`, пропуск (`skip`) навигации
- state в `history` (`pushState`, `replaceState`)
- path-параметры и query
- Security (авторизация, редиректы)
- lifecycle страницы (`render` / `destroy`)

---

## Инициализация роутера

- Конструктор создаёт корневой `Component` с id `app`.
- Находит маршрут **Not Found** и сохраняет его для редиректов.
- Подписка на событие `AppEvents.ROUTER_NAVIGATE` для навигации через `useNavigate()`.

- Метод `init()`:
  - Обрабатывает `DOMContentLoaded` для первого рендера
  - Обрабатывает `popstate` для навигации назад/вперед

```ts
public init(): void {
  document.addEventListener('DOMContentLoaded', () => {
    const route: string = `${this.normalizePath(location.pathname)}${location.search ?? ''}`;
    this.handleRoute(route, NavigationMode.PUSH);
  });

  addEventListener('popstate', (event: PopStateEvent) => {
    const historyPath: string = isHistoryState(event.state)
      ? event.state.path
      : `${location.pathname}${location.search ?? ''}`;
    const route: string = this.normalizePath(historyPath);

    this.locationState = event.state?.state ?? null;

    this.handleRoute(route, NavigationMode.SKIP);
  });
}
```

---

## Навигация

Методы:

- `navigateTo(to, options)` — переход на страницу:
  - `to` — строка (path) или число (`history.go`)
  - `options.replace` — заменить текущую запись истории
  - `options.state` — произвольный объект состояния

- `getLocation()` — возвращает объект:
  - `pathname` — текущий path
  - `search` — query строка
  - `state` — объект состояния или `null`

---

## Flow навигации (`handleRoute`)

1. `validateQuery` — проверка корректности query-параметров
2. `matchRouteAndExtractParameters` — поиск маршрута и извлечение path-параметров
3. `resolveSecurity` — проверка доступа и редиректы
4. `updateHistory` — запись в историю браузера (`pushState` / `replaceState`)
5. `render` — отрисовка страницы и уничтожение предыдущей

```ts
private handleRoute(fullPath: string, mode: NavigationMode = NavigationMode.SKIP): void {
  this.validateQuery(fullPath);
  const [pathname, search = ''] = fullPath.split('?');
  const routeAndParameters = matchRouteAndExtractParameters(pathname, routes);

  if (!routeAndParameters) {
    this.redirectToNotFound();
    return;
  }

  const { route, params } = routeAndParameters;

  const redirect = this.resolveSecurity(route);
  if (redirect) {
    this.navigateTo(redirect.to, redirect.options);
    return;
  }

  const queryParameters = extractQuery(search);
  this.params = { ...params, ...queryParameters };

  if (!pathnameEqualsRoute(route.path) && mode !== NavigationMode.SKIP) {
    updateHistory(fullPath, this.locationState, mode);
  }

  this.render(route);
}
```

---

## Path и Query

### normalizePath

Удаляет `BASE_URL` из пути и возвращает относительный path.

### extractQuery

Возвращает объект с query-параметрами (`?key=value`).

### matchRouteAndExtractParameters

Возвращает `{ route, params }` или `null`, если путь не найден.

---

### History

Методы:

- `updateHistory(path, state, mode)` — пуш/реплейс текущего URL с сохранением state
- `isHistoryState(value)` — проверка корректности объекта истории

---

### Security

Метод `resolveSecurity(route)` возвращает `INavigationTarget | null`:

- Если маршрут защищён и пользователь не авторизован → редирект на `AUTH_PAGE` с `replace = true`
- Если пользователь авторизован и пытается открыть `AUTH_PAGE` → редирект на `LEVEL_SELECTION_PAGE` с `replace = false`

---

### Render

- Уничтожение предыдущей страницы (`destroy`)
- Очистка DOM root (`destroyChildren`)
- Создание нового экземпляра страницы (`route.page()`)
- Добавление в DOM

---

### Lifecycle страницы

Все старицы должны наследоваться от интерфейса `IPage`:

- `render(): HTMLElement` — создаёт DOM страницы
- `destroy(): void` — очищает ресурсы (таймеры, подписки)

## Работа с роутером

### Используемые хуки

- `useParams()` — возвращает path + query параметры
- `useNavigate()` — функция навигации через emitter
- `useLocation<T>()` — текущий path + search + state

```ts
const navigate: TNavigateFunction = <T = unknown>(to: string | number, options?: INavigateOptions<T>): void => {
  appEmitter.emit(AppEvents.ROUTER_NAVIGATE, { to, options });
};

export function useParams(): Record<string, string> {
  return router.getParams();
}

export function useNavigate(): TNavigateFunction {
  return navigate;
}

export function useLocation<T = unknown>(): ILocationState<T> {
  return router.getLocation<T>();
}
```

---

### Пример реализации LandingPage и QuizPage

#### Пример реализации LandingPage

```ts
import { ROUTES } from '@/router/constants';
import { useNavigate } from '@/router/hooks';

export class LandingPage implements IPage {
  private navigate = useNavigate();

  public render(): Component {
    const landing: Component = new Component({
      className: [styles.landing, 'pageContainer'],
    });

    const startButton: Button = new Button({
      text: 'Start',
      onClick: this.handleStartClick,
    });

    const aboutButton: Button = new Button({
      text: 'About',
      onClick: this.handleAboutClick,
    });

    landing.append(startButton, aboutButton);

    return landing;
  }

  private handleStartClick = (): void => {
    // Переход на QuizPage с параметром id и query
    this.navigate('/quiz/1?mode=hard');
    //OR
    this.navigate(ROUTES.QUIZ_PAGE, { id: '1' }, { mode: 'hard' });
  };

  private handleAboutClick = (): void => {
    // Переход на AboutPage без параметров
    this.navigate(ROUTES.ABOUT_PAGE);
  };
}
```

#### Пример реализации QuizPage

```ts
import { useLocation, useParams } from '@/router/hooks';

export class QuizPage implements IPage {
  private location = useLocation();
  private params = useParams();

  constructor() {
    // Можно посмотреть текущий path и query
    console.log('Current path:', this.location.pathname);
    console.log('Current query:', this.location.search);
  }

  public render(): Component {
    const quiz: Component = new Component({
      className: [styles.quiz, 'pageContainer'],
    });

    const info: Component = new Component({
      tag: 'p',
      text: `Current Quiz ID: ${this.params.id ?? 'none'}, Mode: ${this.params.mode ?? 'none'}`,
    });

    quiz.append(info);
    return quiz;
  }

  public destroy(): void {}
}
```

- В результате на странице LandingPage 2 кнопки, по клику мы можем выполнить редирект.

- На странице QuizPage:
  - Отобразится

  ```
    Current Quiz ID: 1, Mode: hard
  ```

  - В Console:

  ```
      Current path: /quiz/1
      Current query: ?mode=hard
  ```
