const app = require("./app.js");
const dotenv = require('dotenv')
const connect = require("./db/connect.js");
const cloudinary = require("cloudinary");
const Razorpay = require("razorpay");

// Load environment variables - try both local and Vercel
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: "backend/db/config.env" });
}

// Connect to database
const startServer = async () => {
  try {
    await connect();
    console.log("✅ Database connection established");
  } catch (error) {
    console.error("❌ Failed to connect to database:", error.message);
    console.warn("⚠️ Continuing without database connection - will retry automatically");
  }
};

// Initialize database connection (non-blocking)
startServer();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const PORT = process.env.PORT || 4000;

// For Vercel serverless functions, export the app directly
if (process.env.NODE_ENV === 'production') {
  module.exports = app;
} else {
  // For local development, start the server
  const server = app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`);
  });
}
