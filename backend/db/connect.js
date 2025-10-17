const mongoose = require("mongoose");

const connect = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }
    
    console.log("Attempting to connect to MongoDB...");
    console.log("DB_URI:", process.env.DB_URI ? "Set" : "Not set");
    
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error;
  }
};

module.exports = connect;
