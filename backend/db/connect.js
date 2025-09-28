const mongoose = require("mongoose");

const connect = () => {
  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve();
  }
  
  return mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  })
  .then((data) => {
    return data;
  })
  .catch((error) => {
    throw error;
  });
};

module.exports = connect;
