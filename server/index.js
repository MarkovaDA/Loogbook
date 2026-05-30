import cors from 'cors';
import express from 'express';
import { desc, eq } from 'drizzle-orm';
import { entries, getDb } from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/entries', (_req, res) => {
  const db = getDb();
  const allEntries = db.select().from(entries).orderBy(desc(entries.date)).all();
  res.json(allEntries);
});

app.post('/entries', (req, res) => {
  const { date, workType, volume, unit, performer } = req.body;
  const db = getDb();

  const entry = db
    .insert(entries)
    .values({ date, workType, volume, unit, performer })
    .returning()
    .get();

  res.status(201).json(entry);
});

app.put('/entries/:id', (req, res) => {
  const { date, workType, volume, unit, performer } = req.body;
  const db = getDb();
  const id = Number(req.params.id);

  const entry = db
    .update(entries)
    .set({ date, workType, volume, unit, performer })
    .where(eq(entries.id, id))
    .returning()
    .get();

  if (!entry) {
    res.status(404).json({ error: 'Запись не найдена' });
    return;
  }

  res.json(entry);
});

app.delete('/entries/:id', (req, res) => {
  const db = getDb();
  const id = Number(req.params.id);

  const entry = db.delete(entries).where(eq(entries.id, id)).returning().get();

  if (!entry) {
    res.status(404).json({ error: 'Запись не найдена' });
    return;
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`SQLite API: http://localhost:${PORT}/entries`);
});
