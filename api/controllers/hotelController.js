const Hotel = require('../models/Hotel');
const CustomError = require('../errors');
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
  await Hotel.findOne({ _id: req.params.id })
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
  try {
    const getHotel = await Hotel.findOne({ _id: req.params.id });
    res.status(200).json({
      status: 'success',
      getHotel,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllHotels = async (req, res, next) => {
  try {
    const getAllHotel = await Hotel.find();

    if (getAllHotel) {
      res.status(200).json({
        status: 'success',
        getAllHotel,
      });
    } else {
      throw new CustomError.BadRequestError('sorry');
    }
  } catch (err) {
    next(err);
  }
};
module.exports.deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'success', message: 'deleted' });
  } catch (error) {
    next(error);
  }
};
module.exports.getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
module.exports.countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
module.exports.countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

module.exports.getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};