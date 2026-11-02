import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('spendwise.db');

export const initDatabase = () => {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      note TEXT,
      date TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS budgets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      month TEXT NOT NULL,
      amount REAL NOT NULL
    );
  `);
};

export const insertSampleTransaction = () => {
  const today = new Date().toISOString().split('T')[0];
  db.runSync(
    'INSERT INTO transactions (type, amount, category, note, date) VALUES (?, ?, ?, ?, ?)',
    ['expense', 15.50, 'Food', 'Lunch', today]
  );
};