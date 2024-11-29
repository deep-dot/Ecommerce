const mongoose = require("mongoose");
const config = require('./config.js');
const env = process.env.NODE_ENV || 'development';

const connectDatabase = () => {
  mongoose
    .connect(config.db_url[env], {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
