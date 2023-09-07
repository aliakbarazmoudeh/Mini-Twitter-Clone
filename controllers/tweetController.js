const { StatusCodes } = require('http-status-codes');
const customError = require('../errors');
const Tweet = require('../models/Tweet');
const User = require('../models/User');
const checkPermission = require('../utils/checkPermission');
const createdDate = require('../utils/date');

const getSingleTweet = async (req, res) => {
  const tweet = await Tweet.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  });
  if (!tweet)
    throw new customError.NotFoundError(
      `cant find any tweet with this ID ${req.params.id}`
    );
  res.status(StatusCodes.OK).json(tweet);
};

const getAllTweets = async (req, res) => {
  const tweets = await Tweet.findAll({
    include: {
      model: User,
      attributes: ['name', 'username'],
    },
    order: [['createdAt', 'desc']],
  });
  res.status(StatusCodes.OK).json(tweets);
};

const createTweet = async (req, res) => {
  const { text, UserId } = { ...req.body, ...req.user };
  if (!UserId)
    throw new customError.BadRequestError('User Id must be provided');
  const tweet = await Tweet.create({ text, UserId, created: createdDate() });
  res.status(StatusCodes.CREATED).json(tweet);
};

const updateTweet = async (req, res) => {
  const tweet = await Tweet.findByPk(req.params.id);
  if (!tweet)
    throw new customError.NotFoundError(
      `cant find any tweet with this ID : ${req.params.id}`
    );
  const { text } = req.body;
  if (text) checkPermission(req.user, tweet.UserId);
  tweet.set(req.body);
  await tweet.save({ fields: ['text', 'numOfLikes'] });
  res.status(StatusCodes.OK).json(tweet);
};

const deleteTweet = async (req, res) => {
  const tweet = await Tweet.findByPk(req.params.id);
  if (!tweet)
    throw new customError.NotFoundError(
      `cant find any tweet with this ID : ${req.params.id}`
    );
  checkPermission(req.user, tweet.UserId);
  await tweet.destroy();
  res.status(StatusCodes.OK).json({ successful: true });
};

module.exports = {
  getAllTweets,
  getSingleTweet,
  updateTweet,
  createTweet,
  deleteTweet,
};
