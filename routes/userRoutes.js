const express = require('express');
const router = express.Router();
const {
  logIn,
  register,
  getSingleUser,
  showCurrenUsre,
  verifyEmail,
  follow,
  updateUser,
  updateProfileUser,
  isFollowed,
  getAllUsers,
  unfollow,
} = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authentication');

router.route('/login').post(logIn);
router.route('/register').post(register);
router.route('/verify').get(authenticateUser, verifyEmail);
router
  .route('/follow')
  .post(authenticateUser, follow)
  .delete(authenticateUser, unfollow);
router.route('/follow/:id').get(authenticateUser, isFollowed);
router
  .route('/')
  .get(authenticateUser, showCurrenUsre)
  .patch(authenticateUser, updateUser);
router.route('/profile').patch(authenticateUser, updateProfileUser);
router.route('/:id').get(getSingleUser);
router.route('/search/:word').get(authenticateUser, getAllUsers);

module.exports = router;
