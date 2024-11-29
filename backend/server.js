require('dotenv').config();
const app = require("./app");
const cloudinary = require('cloudinary').v2;
const connectDatabase = require("./config/database");
const config = require('./config/config');
const env = process.env.NODE_ENV || 'development';

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);

  // Close the MongoDB connection if you're using Mongoose
  require('mongoose').connection.close();
  
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Connecting to database
connectDatabase();

 cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//console.log('process.env.CLOUDINARY_NAME',process.env.CLOUDINARY_NAME);

const server = app.listen(process.env.PORT || 3001, () => {
  const url = config.urls[process.env.NODE_ENV || 'development'];
  if (url) {
    if (process.env.NODE_ENV === 'development') {
      if (Array.isArray(url)) {
        url.forEach((urlItem) => console.log(`listening on ${urlItem}:${process.env.PORT}`));
      } else {
        console.log(`listening on ${url}`);
      }
    } else {
      console.log(`listening on ${url}`);
    }
  } else {
    console.error('Failed to retrieve URL from config file');
  }
  //console.log(config.google_url[env], config.fb_url[env])
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
