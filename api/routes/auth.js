const express = require('express');
const router = express.Router();
const {
  register,
  verifyEmail,
  login,
} = require('../controllers/authController');

router.get('/', (req, res) => {
  res.send('Hello, this is auth');
});
router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
module.exports = router;
