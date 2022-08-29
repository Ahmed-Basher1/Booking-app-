const Room = require('../models/rooms');
const Hotel = require('../models/Hotel');
const CustomError = require('../errors');

module.exports.createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      const ss = await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

module.exports.updateRoom = async (req, res, next) => {
  await Room.findOne({ _id: req.params.id })
    .then((data) => {
      for (prop in req.body) {
        data[prop] = req.body[prop];
      }
      return data.save().then((data) => {
        res.status(200).json({
          status: 'success',
          data,
        });
      });
    })
    .catch((err) => next(err));
};

module.exports.getRoomById = async (req, res, next) => {
  try {
    const getRoom = await Room.findOne({ _id: req.params.id });
    res.status(200).json({
      status: 'success',
      getRoom,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllRooms = async (req, res, next) => {
  try {
    const getAllRoom = await Room.find();

    if (getAllHotel) {
      res.status(200).json({
        status: 'success',
        getAllRoom,
      });
    } else {
      throw new CustomError.BadRequestError('sorry');
    }
  } catch (err) {
    next(err);
  }
};
module.exports.deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'success', message: 'deleted' });
  } catch (error) {
    next(error);
  }
};
