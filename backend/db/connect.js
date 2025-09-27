const mongoose = require("mongoose");

const connect = () => {
  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected');
    return;
  }

  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
};

module.exports = connect;
