const express = require('express');
const router = express.Router();
const {
  createHotel,
  updateHotel,
  getAllHotels,
  getHotelById,
} = require('../controllers/hotelController');

router.post('/', createHotel);
router.route('/:id').get(getHotelById).put(updateHotel);
router.get('/', getAllHotels);
module.exports = router;
