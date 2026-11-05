// ─── Database Connection (Singleton) ──────────────────────────────────────
// Uses better-sqlite3 — synchronous, file-based SQLite.
// The DB file lives at the project root: tessma.db

import Database from 'better-sqlite3';
import path from 'path';
import { runSeed } from './seed';

const DB_PATH = path.join(process.cwd(), 'tessma.db');

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;

  _db = new Database(DB_PATH);

  // Performance tuning
  _db.pragma('journal_mode = WAL');
  _db.pragma('foreign_keys = ON');

  // Initialize schema + seed on first connection
  runSeed(_db);

  return _db;
}
