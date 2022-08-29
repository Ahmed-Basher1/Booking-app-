const express = require('express');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const router = express.Router();
const {
  createRoom,
  updateRoom,
  getAllRooms,
  getRoomById,
} = require('../controllers/roomsController');

router.post('/:hotelId', createRoom);
router.route('/:id').get(getRoomById).put(updateRoom);
router.get('/', authenticateUser, authorizePermissions, getAllRooms);
module.exports = router;
