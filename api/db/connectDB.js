const mongoose = require('mongoose');

const connectDB = (url) => {
  mongoose.connection.on('connected', () => {
    console.log('Monogo db connectd');
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Monogo db disconnected');
  });
  return mongoose.connect(url);
};
module.exports = connectDB;
