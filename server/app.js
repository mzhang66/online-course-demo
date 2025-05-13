require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const problemTitlesRoutes = require('./routes/problemTitles');
const cheatSheetRoutes = require('./routes/cheatsheet');
const validateApiKey = require('./middleware/apiKey');
const cookieParser = require('cookie-parser');

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://ccc.tripodmobile.com' 
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Cookie', 
    'x-api-key'
  ],
};

// Apply middlewares in correct order
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Public routes (no API key required)
app.use('/api/auth', authRoutes);

// Protected routes (API key required)
app.use('/api/courses', validateApiKey, courseRoutes);
app.use('/api/problem-titles', validateApiKey, problemTitlesRoutes);
app.use('/api/cheatsheet', validateApiKey, cheatSheetRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app; 