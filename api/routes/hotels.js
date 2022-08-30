const express = require('express');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const router = express.Router();
const {
  createHotel,
  updateHotel,
  getAllHotels,
  getHotelById,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
} = require('../controllers/hotelController');

router.post('/', createHotel);
router.route('/find/:id').get(getHotelById).put(updateHotel);
// router.get('/', authenticateUser, authorizePermissions, getAllHotels);
router.get('/', getHotels);
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
router.get('/room/:id', getHotelRooms);
module.exports = router;
