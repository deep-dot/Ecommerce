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
  require("dotenv").config({ path: "backend/config.env" });
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
  const urlArray = config.urls[env]; // Get the URLs array for the current environment
  if (urlArray && urlArray.length > 0) {
    if (process.env.NODE_ENV === 'development') {
      // Log all development URLs
      urlArray.forEach((urlItem) =>
        console.log(`Listening on ${urlItem}:${process.env.PORT || 3001}`)
      );
    } else {
      // Log the first production URL
      const url = urlArray[0];
      console.log(`Listening on ${url}:${process.env.PORT || 3001}`);
    }
  } else {
    console.error('Failed to retrieve URL(s) from config file. Please check your configuration.');
  }
});


// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
