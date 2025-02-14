const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'mileage.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Middleware to check if user is authenticated
const authMiddleware = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Hash password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Compare password
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Create tables if they don't exist
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

// Inserting a user (example)
const insertUser = (username, password) => {
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err) {
    if (err) {
      console.error('Error inserting user:', err.message);
    } else {
      console.log(`Inserted user with id: ${this.lastID}`);
    }
  });
};

// Inserting mileage entry for a user (example)
const insertMileage = (userId, date, miles, description) => {
  db.run('INSERT INTO mileage (user_id, date, miles, description) VALUES (?, ?, ?, ?)', [userId, date, miles, description], function(err) {
    if (err) {
      console.error('Error inserting mileage:', err.message);
    } else {
      console.log(`Inserted mileage with id: ${this.lastID}`);
    }
  });
};

module.exports = { authMiddleware, hashPassword, comparePassword, insertUser, insertMileage };
