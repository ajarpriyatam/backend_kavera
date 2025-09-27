// Load environment variables for Vercel
require('dotenv').config();

// Simple test endpoint for Vercel
const express = require('express');
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Vercel serverless function is working',
    timestamp: new Date().toISOString()
  });
});

// Import and use your main app routes
try {
  const mainApp = require("../backend/app.js");
  app.use('/', mainApp);
} catch (error) {
  console.error('Error loading main app:', error);
  app.get('*', (req, res) => {
    res.status(500).json({ 
      error: 'App loading failed', 
      message: error.message 
    });
  });
}

module.exports = app;
