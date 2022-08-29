const express = require('express');
const { authenticateUser } = require('../middleware/authentication');

const router = express.Router();
const {
  register,
  verifyEmail,
  login,
  logout,
} = require('../controllers/authController');

router.get('/', (req, res) => {
  res.send('Hello, this is auth');
});
router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.delete('/logout', authenticateUser, logout);
module.exports = router;
