const mongoose = require('mongoose');

const checkDatabaseConnection = (req, res, next) => {
  // Check if database is connected
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({
      success: false,
      message: "Database connection error",
      error: "Database is not connected. Please try again later."
    });
  }
  
  next();
};

module.exports = checkDatabaseConnection;
