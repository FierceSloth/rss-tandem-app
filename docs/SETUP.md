# Установка приложения локально

1. Сделайте `fork` репозитория
2. Перейдите в свой репозиторий, скопируйте `HTTPS` или `SSH` и сделайте локально `git clone`
3. Уставновите все зависимости с помощью `npm install`
4. Cоздайте `.env` по аналогии с `.env.example`
5. Зарегистрируйтесь на https://supabase.com/ и создайте там проект `TANDEM`
6. Скопируйте и вставьте `Project URL` и `Publishable key`, вставьте их в `.env`
7. Перейдите на сайт https://www.ipify.org/. Скопируйте `https://api.ipify.org?format=json` и вставьте эту строку в `.env`
8. C помощью `npm run dev` запустите проект локально

## Настройка базы данных в Supabase

Откройте в боковом меню `SQL Editor` и запустите последовательно код.

1. Создание таблицы `profiles`

```sql
-- 1. Создание таблицы
create table public.profiles (
  id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  username text,
  email text,
  updated_at timestamptz,
  primary key (id)
);

-- 2. Включить RLS
alter table public.profiles enable row level security;

-- 3. Политики доступа
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 4. Функция для автосоздания профиля
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, created_at)
  values (new.id, new.email, now());
  return new;
end;
$$ language plpgsql security definer;

-- 5. Триггер
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

2. Создание таблицы `modules`

```sql
create table public.modules (
  id int4 primary key generated always as identity,
  title text not null
);

-- RLS
alter table public.modules enable row level security;

create policy "Modules are viewable by everyone"
  on public.modules for select
  using (true);
```

3. Создание таблицы `levels`

```sql
create table public.levels (
  id uuid primary key default gen_random_uuid(),
  module_id int4 not null references public.modules(id) on delete cascade,
  title text not null,
  description text,
  widget_type text not null,
  difficulty text
);

-- RLS
alter table public.levels enable row level security;

create policy "Levels are viewable by everyone"
  on public.levels for select
  using (true);
```

4. Создание таблицы `user_level_progress`

```sql
create table public.user_level_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  level_id uuid not null references public.levels(id) on delete cascade,
  status text not null,
  stars int4
);

-- RLS
alter table public.user_level_progress enable row level security;

-- Пользователь видит только свой прогресс
create policy "Users can view own progress"
  on public.user_level_progress for select
  using (auth.uid() = user_id);

-- Пользователь может создавать свой прогресс
create policy "Users can insert own progress"
  on public.user_level_progress for insert
  with check (auth.uid() = user_id);

-- Пользователь может обновлять свой прогресс
create policy "Users can update own progress"
  on public.user_level_progress for update
  using (auth.uid() = user_id);
```

5. Создание таблицы `output_predictor_questions`

```sql
create table public.output_predictor_questions (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.levels(id) on delete cascade,
  title text not null,
  code text,
  options jsonb not null,
  tag text not null
);

-- RLS
alter table public.output_predictor_questions enable row level security;

create policy "Output predictor questions are viewable by everyone"
  on public.output_predictor_questions for select
  using (true);
```

6. Создание таблицы `code_arena_questions`

```sql
create table public.code_arena_questions (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.levels(id) on delete cascade,
  title text not null,
  topic text not null,
  description text not null,
  initial_code text not null,
  tests text not null
);

-- RLS
alter table public.code_arena_questions enable row level security;

create policy "Code arena questions are viewable by everyone"
  on public.code_arena_questions for select
  using (true);
```

7. Создание таблицы `quiz_questions`

```sql
create table public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.levels(id) on delete cascade,
  question text not null,
  code_snippet text,
  options jsonb not null,
  language text not null,
  tags text[]
);

-- RLS
alter table public.quiz_questions enable row level security;

create policy "Quiz questions are viewable by everyone"
  on public.quiz_questions for select
  using (true);
```

8. Создание таблицы `true_false_questions`

```sql
create table public.true_false_questions (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.levels(id) on delete cascade,
  "order" int4,
  tag text not null,
  code_snippet text not null,
  answer text not null,
  is_correct bool not null
);

-- RLS
alter table public.true_false_questions enable row level security;

create policy "True false questions are viewable by everyone"
  on public.true_false_questions for select
  using (true);
```

9. Создание таблицы `theory_hubs`

```sql
create table public.theory_hubs (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.levels(id) on delete cascade,
  title text not null,
  description text not null,
  materials jsonb not null
);

-- RLS
alter table public.theory_hubs enable row level security;

create policy "Theory hubs are viewable by everyone"
  on public.theory_hubs for select
  using (true);
```

10. Создание таблицы `contributors`

```sql
create table public.contributors (
  id int8 primary key generated always as identity,
  user_role varchar not null,
  avatar_url text,
  username varchar not null,
  contributions text,
  github_url text,
  created_at timestamptz default now()
);

-- RLS
alter table public.contributors enable row level security;

create policy "Contributors are viewable by everyone"
  on public.contributors for select
  using (true);
```

## Seed данные (импорт CSV)

Данные таблиц БД

### Как импортировать из `csv` файлов

1. Перейдите в `Supabase → Table Editor`
2. Выберите нужную таблицу
3. Нажмите кнопку `Insert` и выберите `Import data from CSV` (правый верхний угол)
4. Загрузите соответствующий CSV файл
5. Проверьте маппинг колонок и подтвердите

### Порядок импорта (важно!)

Таблицы нужно импортировать **в этом порядке** из-за зависимостей внешних ключей:

1. `modules.csv` - [**modules_rows**](./assets/seed/modules_rows.csv)
2. `levels.csv` - [**levels_rows**](./assets/seed/levels_rows.csv)
3. `theory_hubs.csv` - [**theory_hubs_rows**](./assets/seed/theory_hubs_rows.csv)
4. `quiz_questions.csv` - [**quiz_questions_rows**](./assets/seed/quiz_questions_rows.csv)
5. `true_false_questions.csv` - [**true_false_questions_rows**](./assets/seed/true_false_questions_rows.csv)
6. `output_predictor_questions.csv` - [**output_predictor_questions_rows**](./assets/seed/output_predictor_questions_rows.csv)
7. `code_arena_questions.csv` - [**code_arena_questions_rows**](./assets/seed/code_arena_questions_rows.csv)
8. `contributors.csv` - [**contributors_rows**](./assets/seed/contributors_rows.csv)

> ⚠️ Не меняйте порядок импорта — каждая таблица зависит от предыдущих.
