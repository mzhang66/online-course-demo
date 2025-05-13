//require('dotenv').config();
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = require('./app');
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

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

// Apply CORS configuration
app.use(cors(corsOptions));

// SSL options
let sslOptions; 
if (process.env.NODE_ENV === 'development') {
  sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'key_selfsigned.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert_selfsigned.pem'))
  };
} else {
  sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
  };
}

// Create HTTPS server
const server = https.createServer(sslOptions, app);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  server.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
}); 