const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'mileage.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error(err.message);
  console.log('Connected to SQLite database.');
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS mileage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    date TEXT,
    miles REAL,
    description TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
});
// Inserting a user
db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['john_doe', 'hashed_password'], function(err) {
  if (err) {
    console.error('Error inserting user:', err.message);
  } else {
    console.log(`Inserted user with id: ${this.lastID}`);
  }
});

// Inserting mileage entry for a user
db.run('INSERT INTO mileage (user_id, date, miles, description) VALUES (?, ?, ?, ?)', [1, '2025-02-13', 100.5, 'Test description'], function(err) {
  if (err) {
    console.error('Error inserting mileage:', err.message);
  } else {
    console.log(`Inserted mileage with id: ${this.lastID}`);
  }
});


module.exports = db;