const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path'); // <-- Add this line
const dbPath = path.join(__dirname, '../mileage.db');
const db = new sqlite3.Database(dbPath);

const router = express.Router();

// Route to add mileage
router.post('/add', (req, res) => {
  const { userId, date, miles, description } = req.body;

  db.run('INSERT INTO mileage (user_id, date, miles, description) VALUES (?, ?, ?, ?)',
    [userId, date, miles, description], function(err) {
      if (err) {
        console.error('Error inserting mileage:', err.message);
        return res.status(500).json({ error: 'Database error' });
      }

      res.status(201).json({ message: 'Mileage added successfully', mileageId: this.lastID });
    }
  );
});

// Route to get mileage for a user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  db.all('SELECT * FROM mileage WHERE user_id = ?', [userId], (err, rows) => {
    if (err) {
      console.error('Error fetching mileage:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(rows);
  });
});

module.exports = router;
