const { StatusCodes } = require('http-status-codes');
const customError = require('../errors');
const Tweet = require('../models/Tweet');
const User = require('../models/User');
const checkPermission = require('../utils/checkPermission');
const createdDate = require('../utils/date');
const Like = require('../models/Like');
const Following = require('../models/following');
const { where, Sequelize } = require('sequelize');

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
  let tweets = await Following.findAll({
    where: { Follower: req.user.UserId },
    raw: true,
    include: [
      {
        model: User,
        as: 'followings',
        attributes: ['id', 'name', 'username', 'profile', 'official'],
        include: { model: Tweet },
      },
    ],
    order: [[Sequelize.col('followings.Tweets.createdAt'), 'desc']],
  });
  let { tweetId } = req.body;
  const LikedTweet = await Like.findAll();
  // req.io.emiter('liked', { LikedTweet });
  req.io.emiter('tweets', { tweets });
  // console.log(req.io.on);
  // req.io.on('connection', (socket) => {
  //   socket.emiter('tweets', { tweets });
  // });
  res.status(StatusCodes.OK);
};

const createTweet = async (req, res) => {
  const { text, UserId } = { ...req.body, ...req.user };
  if (!UserId)
    throw new customError.BadRequestError('User Id must be provided');
  const tweet = await Tweet.create({ text, UserId, created: createdDate() });
  res.status(StatusCodes.CREATED).json(tweet);
};

const updateTweet = async (req, res) => {
  console.log(req.user);
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

const likeTweet = async (req, res) => {
  const { id } = req.params;
  const likedTweet = await Like.create({
    tweetId: id,
    UserId: req.user.UserId,
  });
  const tweet = await Tweet.findOne({ where: { id } });
  tweet.setNumOfLike('+');
  tweet.save();
  res.json({ successful: true });
};

const disLikeTweet = async (req, res) => {
  const { id } = req.params;

  const likedTweet = await Like.destroy({
    where: {
      tweetId: id,
      UserId: req.user.UserId,
    },
  });
  const tweet = await Tweet.findOne({ where: { id } });
  tweet.setNumOfLike('-');
  tweet.save();
  res.json({ successful: true });
};

const getAllLikedTweet = async (req, res) => {
  let { tweetId } = req.body;
  let whereBody = { UserId: req.user.UserId };
  tweetId ? (whereBody['tweetId'] = tweetId) : null;
  const LikedTweet = await Like.findAll({
    where: whereBody,
  });
  res.status(StatusCodes.OK).json(LikedTweet);
};

module.exports = {
  getAllTweets,
  getSingleTweet,
  updateTweet,
  createTweet,
  deleteTweet,
  getAllLikedTweet,
  likeTweet,
  disLikeTweet,
};
