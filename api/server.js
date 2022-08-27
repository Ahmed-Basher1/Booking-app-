const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connectDB');
const app = express();
const authRoute = require('./routes/auth');
const hotelsRoute = require('./routes/auth');
const roomsRoute = require('./routes/auth');
const usersRoute = require('./routes/auth');
dotenv.config();

app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
const port = process.env.PORT || 5000;




// not found middleware
app.use((req, res) => {
    res
      .status(404)
      .json({ success: false, message: "your request url is NOT FOUND" });
  });
  
  // error middleware
  app.use((error, req, res, next) => {
    let status = error.status || 500;
    res
      .status(status)
      .json({ success: false, message: "Internal Error" + error });
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
