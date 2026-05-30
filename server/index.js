import cors from 'cors';
import express from 'express';
import { getDb } from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/entries', (_req, res) => {
  const db = getDb();
  const entries = db.prepare('SELECT * FROM entries ORDER BY date DESC').all();
  res.json(entries);
});

app.post('/entries', (req, res) => {
  const { date, workType, volume, unit, performer } = req.body;
  const db = getDb();

  const result = db
    .prepare(`
      INSERT INTO entries (date, workType, volume, unit, performer)
      VALUES (?, ?, ?, ?, ?)
    `)
    .run(date, workType, volume, unit, performer);

  const entry = db.prepare('SELECT * FROM entries WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(entry);
});

app.put('/entries/:id', (req, res) => {
  const { date, workType, volume, unit, performer } = req.body;
  const db = getDb();

  const result = db
    .prepare(`
      UPDATE entries
      SET date = ?, workType = ?, volume = ?, unit = ?, performer = ?
      WHERE id = ?
    `)
    .run(date, workType, volume, unit, performer, req.params.id);

  if (result.changes === 0) {
    res.status(404).json({ error: 'Запись не найдена' });
    return;
  }

  const entry = db.prepare('SELECT * FROM entries WHERE id = ?').get(req.params.id);
  res.json(entry);
});

app.delete('/entries/:id', (req, res) => {
  const db = getDb();
  const result = db.prepare('DELETE FROM entries WHERE id = ?').run(req.params.id);

  if (result.changes === 0) {
    res.status(404).json({ error: 'Запись не найдена' });
    return;
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`SQLite API: http://localhost:${PORT}/entries`);
});
