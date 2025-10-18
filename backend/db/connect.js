const mongoose = require("mongoose");

const connect = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    // Check if connection string exists
    if (!process.env.DB_URI) {
      throw new Error("Database URI not found in environment variables");
    }

    console.log("Attempting to connect to MongoDB...");
    
    await mongoose.connect(process.env.DB_URI, {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 5, // Maintain a minimum of 5 socket connections
      retryWrites: true, // Enable retryable writes
      retryReads: true, // Enable retryable reads
      connectTimeoutMS: 30000, // 30 seconds
      heartbeatFrequencyMS: 10000, // 10 seconds
    });

    console.log("✅ Connected to MongoDB successfully");

    // Add connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected - attempting to reconnect...');
      // Auto-reconnect after 5 seconds
      setTimeout(() => {
        if (mongoose.connection.readyState === 0) {
          connect().catch(err => console.error('Reconnection failed:', err));
        }
      }, 5000);
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });

    mongoose.connection.on('close', () => {
      console.warn('⚠️ MongoDB connection closed');
    });

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Don't throw error, let the app continue and try to reconnect
    console.warn("⚠️ Continuing without database connection - will retry automatically");
    return;
  }
};

module.exports = connect;
