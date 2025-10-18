const mongoose = require('mongoose');

const checkDatabaseConnection = (req, res, next) => {
  // Check if database is connected or connecting
  const connectionState = mongoose.connection.readyState;
  
  // Connection states: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (connectionState === 0 || connectionState === 3) {
    return res.status(500).json({
      success: false,
      message: "Database connection error",
      error: "Database is not connected. Please try again later.",
      connectionState: connectionState
    });
  }
  
  // If connecting (state 2), wait a bit and try again
  if (connectionState === 2) {
    // Wait for connection to complete (max 5 seconds)
    const startTime = Date.now();
    const checkConnection = () => {
      if (mongoose.connection.readyState === 1) {
        return next();
      }
      if (Date.now() - startTime > 5000) {
        return res.status(500).json({
          success: false,
          message: "Database connection timeout",
          error: "Database connection is taking too long. Please try again later."
        });
      }
      setTimeout(checkConnection, 100);
    };
    return checkConnection();
  }
  
  next();
};

module.exports = checkDatabaseConnection;
