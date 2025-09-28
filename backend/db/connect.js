const mongoose = require("mongoose");

const connect = () => {
  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected');
    return Promise.resolve();
  }

  console.log('Connecting to MongoDB...');
  console.log('DB_URI exists:', !!process.env.DB_URI);
  
  return mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  })
  .then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
    return data;
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    throw error;
  });
};

module.exports = connect;
