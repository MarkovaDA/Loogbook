import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const entries = sqliteTable('entries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  date: text('date').notNull(),
  workType: text('workType').notNull(),
  volume: text('volume').notNull(),
  unit: text('unit').notNull(),
  performer: text('performer').notNull(),
});
