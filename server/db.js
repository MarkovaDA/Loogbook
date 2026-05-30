import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { count } from 'drizzle-orm';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { entries } from './schema.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, 'worklog.db');

let dbInstance = null;

function seedDb(db) {
  const seedPath = join(__dirname, '..', 'public', 'worklog-static-data.json');
  const data = JSON.parse(readFileSync(seedPath, 'utf-8'));

  db.insert(entries).values(
    data.entries.map(({ date, workType, volume, unit, performer }) => ({
      date,
      workType,
      volume,
      unit,
      performer,
    })),
  ).run();
}

export function getDb() {
  if (dbInstance) {
    return dbInstance;
  }

  const sqlite = new Database(DB_PATH);
  sqlite.pragma('journal_mode = WAL');

  dbInstance = drizzle(sqlite, { schema: { entries } });

  migrate(dbInstance, { migrationsFolder: join(__dirname, 'migrations') });

  const { count: entriesCount } = dbInstance
    .select({ count: count() })
    .from(entries)
    .get();

  if (entriesCount === 0) {
    seedDb(dbInstance);
  }

  return dbInstance;
}

export { entries };
