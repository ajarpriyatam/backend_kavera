// Load environment variables for Vercel
require('dotenv').config();

const express = require('express');
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test endpoint - should work without any dependencies
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Vercel serverless function is working',
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      DB_URI: process.env.DB_URI ? 'Set' : 'Not Set'
    }
  });
});

// Simple products endpoint without database
app.get('/api/v1/products', (req, res) => {
  res.json({
    success: true,
    message: 'Products endpoint working',
    data: [
      { id: 1, name: 'Test Product 1', price: 100 },
      { id: 2, name: 'Test Product 2', price: 200 }
    ]
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

// Catch all other routes
app.get('*', (req, res) => {
  res.json({
    message: 'SoleStyle API',
    endpoints: [
      'GET /api/test',
      'GET /api/health', 
      'GET /api/v1/products'
    ],
    path: req.path
  });
});

module.exports = app;
