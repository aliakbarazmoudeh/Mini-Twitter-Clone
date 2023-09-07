const express = require('express');
const router = express.Router();
const {
  createTweet,
  deleteTweet,
  getAllTweets,
  getSingleTweet,
  updateTweet,
} = require('../controllers/tweetController');
const { authenticateUser } = require('../middleware/authentication');
router.use(authenticateUser);
router.route('/').get(getAllTweets).post(createTweet);
router.route('/:id').get(getSingleTweet).patch(updateTweet).delete(deleteTweet);

module.exports = router;
