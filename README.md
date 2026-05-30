# Журнал работ

Внутренний инструмент для учёта выполненных работ на строительном объекте.

**productionUrl:** https://markovada.github.io/Loogbook/

## Production URL

**https://markovada.github.io/Loogbook/**

> На GitHub Pages работает только фронтенд (чтение демо-данных). CRUD с SQLite — локально через Node.js API.

## Локальный запуск

```bash
npm install
npm run dev:full
```

- Фронтенд: http://localhost:5173/
- API (Node.js + SQLite): http://localhost:3001/entries

Только фронтенд (без API, данные из статического JSON):

```bash
npm run dev
```

Только API-сервер:

```bash
npm run server
```

## База данных (SQLite)

- Backend: **Node.js + Express** (`server/index.js`)
- БД: **SQLite** — файл `server/worklog.db` (создаётся автоматически)
- При первом запуске таблица `entries` заполняется из `public/worklog-static-data.json`

Структура таблицы `entries`:

| Поле | Тип |
|---|---|
| id | INTEGER (PK) |
| date | TEXT |
| workType | TEXT |
| volume | TEXT |
| unit | TEXT |
| performer | TEXT |

## Сборка

```bash
npm run build
```

## Деплой

При push в `master` GitHub Actions собирает проект и публикует его в ветку `gh-pages`.

Workflow: `.github/workflows/deploy.yml`

## Стек

- React + TypeScript
- Vite
- Material UI
- Node.js + Express + SQLite (локальная БД)
