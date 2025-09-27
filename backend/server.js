const app = require("./app.js");
const dotenv = require('dotenv')
const connect = require("./db/connect.js");
const cloudinary = require("cloudinary");

// Load environment variables first
dotenv.config({ path: "backend/db/config.env" });

connect();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
});
