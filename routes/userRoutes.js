const express = require('express');
const router = express.Router();
const {
  logIn,
  register,
  getSingleUser,
  showCurrenUsre,
  verifyEmail,
  follow,
} = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authentication');

router.route('/login').post(logIn);
router.route('/register').post(register);
router.route('/verify').get(authenticateUser, verifyEmail);
router.route('/follow').post(authenticateUser, follow);
router.route('/').get(authenticateUser, showCurrenUsre);
router.route('/:id').get(getSingleUser);

module.exports = router;
