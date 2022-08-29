const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connectDB');
const app = express();
const authRoute = require('./routes/auth');
const hotelsRoute = require('./routes/hotels');
const roomsRoute = require('./routes/rooms');
const usersRoute = require('./routes/users');
const cookieParser = require('cookie-parser');
dotenv.config();
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
 //app.use('/api/rooms', roomsRoute);
 app.use('/api/users', usersRoute);
const port = process.env.PORT || 5000;

// not found middleware
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: 'your request url is NOT FOUND' });
});

// error middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
