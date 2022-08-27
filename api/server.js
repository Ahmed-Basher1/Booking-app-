const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connectDB');
const app = express();
dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {}
};
start();
