import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, 'worklog.db');

let dbInstance = null;

function seedDb(db) {
  const seedPath = join(__dirname, '..', 'public', 'worklog-static-data.json');
  const data = JSON.parse(readFileSync(seedPath, 'utf-8'));

  const insert = db.prepare(`
    INSERT INTO entries (date, workType, volume, unit, performer)
    VALUES (@date, @workType, @volume, @unit, @performer)
  `);

  const insertMany = db.transaction((entries) => {
    for (const entry of entries) {
      insert.run({
        date: entry.date,
        workType: entry.workType,
        volume: entry.volume,
        unit: entry.unit,
        performer: entry.performer,
      });
    }
  });

  insertMany(data.entries);
}

export function getDb() {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = new Database(DB_PATH);
  dbInstance.pragma('journal_mode = WAL');

  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      workType TEXT NOT NULL,
      volume TEXT NOT NULL,
      unit TEXT NOT NULL,
      performer TEXT NOT NULL
    )
  `);

  const { count } = dbInstance.prepare('SELECT COUNT(*) as count FROM entries').get();

  if (count === 0) {
    seedDb(dbInstance);
  }

  return dbInstance;
}
