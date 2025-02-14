require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./database');
const { authMiddleware } = require('./auth'); // Destructured import
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 86400000 // 1 day
  }
}));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/mileage', require('./routes/mileageRoutes'));

// Serve HTML pages
app.get(['/', '/home'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
});

// Dashboard route with authentication middleware
app.get('/dashboard', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
