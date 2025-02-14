const express = require('express');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path'); // <-- Add this line
const dbPath = path.join(__dirname, '../mileage.db');
const db = new sqlite3.Database(dbPath);

const router = express.Router();

// Route for registering a user
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error('Error checking username:', err.message);
      return res.status(500).json({ error: 'Server error' });
    }

    if (row) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err.message);
        return res.status(500).json({ error: 'Error hashing password' });
      }

      db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
        if (err) {
          console.error('Error inserting user:', err.message);
          return res.status(500).json({ error: 'Error creating user' });
        }

        res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
      });
    });
  });
});

module.exports = router;
