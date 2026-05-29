# Журнал работ

Внутренний инструмент для учёта выполненных работ на строительном объекте.

## Production URL

Сайт на GitHub Pages:

**https://markovada.github.io/Loogbook/**

> Если страница не открывается, проверь в репозитории: **Settings → Pages → Deploy from a branch → `gh-pages` / `(root)`**.

## Локальный запуск

```bash
npm install
npm run dev:full
```

- Фронтенд: http://localhost:5173/
- API (json-server): http://localhost:3001/entries

Только фронтенд (данные подгрузятся из статического JSON):

```bash
npm run dev
```

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
- json-server (локальная БД для разработки)
