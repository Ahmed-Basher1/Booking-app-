const mongoose = require('mongoose');

const connectDB = (url) => {
  console.log('Database connected');
  return mongoose.connect(url);
};
module.exports = connectDB;
