const Hotel = require('../models/Hotel');

module.exports.createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const saveHotel = await newHotel.save();
    res.status(200).json({
      status: 'success',
      saveHotel,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateHotel = async (req, res, next) => {
  await Hotel.findOne({ _id: req.body.id })
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

module.exports.getHotelById = async (req, res, next) => {
  const getHotel = await Hotel.findOne({ _id: req.params.id });

  try {
    res.status(200).json({
      status: 'success',
      getHotel,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllHotels = async (req, res, next) => {
  const getAllHotel = await Hotel.find();

  try {
    res.status(200).json({
      status: 'success',
      getAllHotel,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'success', message: 'deleted' });
  } catch (error) {}
};
