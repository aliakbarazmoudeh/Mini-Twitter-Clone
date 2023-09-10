const express = require('express');
const router = express.Router();
const {
  createTweet,
  deleteTweet,
  getAllTweets,
  getSingleTweet,
  updateTweet,
  likeTweet,
  disLikeTweet,
  getAllLikedTweet,
} = require('../controllers/tweetController');
const { authenticateUser } = require('../middleware/authentication');
router.use(authenticateUser);
router.route('/').get(getAllTweets).post(createTweet);
router.route('/likes').post(getAllLikedTweet);
router.route('/:id').get(getSingleTweet).patch(updateTweet).delete(deleteTweet);
router.route('/like/:id').get(likeTweet).delete(disLikeTweet);

module.exports = router;
