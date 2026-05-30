FROM node:20-bookworm-slim AS base

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY server ./server
COPY public/worklog-static-data.json ./public/worklog-static-data.json

ENV PORT=3001
ENV DATABASE_PATH=/data/worklog.db

EXPOSE 3001

VOLUME ["/data"]

CMD ["node", "server/index.js"]
