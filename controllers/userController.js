const { StatusCodes } = require('http-status-codes');
const customError = require('../errors');
const User = require('../models/User');
const { createToken } = require('../utils/jwt');
const { compare } = require('bcryptjs');
const Tweet = require('../models/Tweet');
const sendVerificationLink = require('../utils/verify');
const Following = require('../models/following');
const BookMark = require('../models/BookMark');
const path = require('path');
const sequelize = require('../db/connectDB');
const Op = require('sequelize').Op;

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    throw new customError.BadRequestError(
      'pleas make sure that you provided email, password and username'
    );
  const isAlreadyExists = await User.findOne({
    where: { username: req.body.username, email: req.body.email },
  });
  if (isAlreadyExists) {
    throw new customError.BadRequestError('User already exists');
  }
  req.body.role = (await User.countDocuments) === 0 ? 'admin' : 'user';
  req.body.isVerified = false;
  const user = await User.create(req.body);
  console.log('im going to send a verification link for email');
  sendVerificationLink(email);
  createToken(res, user);
};

const verifyEmail = async (req, res) => {
  const user = await User.findByPk(req.user.UserId);
  user.isVerified = true;
  user.save();
  res.status(StatusCodes.OK).redirect('/twitter.html');
};

const logIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    throw new customError.BadRequestError(
      'password and username must be provided'
    );
  const user = await User.findOne({
    where: { username },
  });
  if (!user) throw new customError.NotFoundError('User not found');
  const isValidPassword = await compare(password, user.password);
  if (!isValidPassword)
    throw new customError.UnauthenticatedError('password was not match');
  createToken(res, user);
};

const showCurrenUsre = async (req, res) => {
  let user = await User.findByPk(req.user.UserId, {
    include: [
      {
        model: Tweet,
        attributes: ['text', 'numOfLikes', 'created'],
      },
      {
        model: Following,
        where: { following: { [Op.ne]: req.user.UserId } },

        attributes: {
          exclude: ['createdAt', 'updatedAt', 'following', 'Follower'],
        },
        include: [
          { model: User, attributes: ['name', 'username'], as: 'followings' },
        ],
      },
      {
        model: BookMark,
        include: [
          {
            model: Tweet,
            attributes: ['text', 'numOfLikes', 'created'],
            include: [{ model: User, attributes: ['name', 'username'] }],
          },
        ],
      },
    ],
    order: [[{ model: Tweet }, 'updatedAt', 'desc']],
    attributes: [
      'id',
      'name',
      'username',
      'email',
      'profile',
      'biography',
      'official',
    ],
  });
  const Followers = await Following.findAll({
    where: {
      following: req.user.UserId,
      Follower: { [Op.ne]: req.user.UserId },
    },
    include: [
      { model: User, attributes: ['name', 'username'], as: 'Followers' },
    ],
    attributes: {
      exclude: ['following', 'Follower', 'createdAt', 'updatedAt'],
    },
  });
  res.status(StatusCodes.OK).json({ user, Followers });
};

const updateUser = async (req, res) => {
  const { image } = req.files;
  const user = await User.findByPk(req.user.UserId, {
    attributes: ['name', 'username'],
  });
  res.json({ image });
};

const updateProfileUser = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }
  const maxSize = 1024 * 512;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError('Please upload image smaller 0.5MB');
  }
  const imagePath = path.join(
    __dirname,
    '../public/src/profiles/' + `${productImage.name}`
  );
  const user = await User.findByPk(req.user.UserId);
  user.profile = `./src/profiles/${productImage.name}`;
  user.save();
  res.json({ user });
};

const getAllUsers = async (req, res) => {
  const word = req.params.word;
  const users = await User.findAll({
    where: {
      id: { [Op.ne]: req.user.UserId },
      username: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('username')),
        'LIKE',
        '%' + word + '%'
      ),
    },
  });
  res.status(StatusCodes.OK).json(users);
};

const getSingleUser = async (req, res) => {
  let user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Tweet,
        attributes: ['text', 'numOfLikes', 'created'],
      },
      {
        model: Following,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'following', 'Follower'],
        },
        include: [
          { model: User, attributes: ['name', 'username'], as: 'followings' },
        ],
      },
      {
        model: BookMark,
        include: [
          {
            model: Tweet,
            attributes: ['text', 'numOfLikes', 'created'],
            include: [{ model: User, attributes: ['name', 'username'] }],
          },
        ],
      },
    ],
    order: [[{ model: Tweet }, 'updatedAt', 'desc']],
    attributes: [
      'id',
      'name',
      'username',
      'email',
      'profile',
      'biography',
      'official',
    ],
  });
  const Followers = await Following.findAll({
    where: { following: req.params.id },
    include: [
      { model: User, attributes: ['name', 'username'], as: 'Followers' },
    ],
    attributes: {
      exclude: ['following', 'Follower', 'createdAt', 'updatedAt'],
    },
  });
  res.status(StatusCodes.OK).json({ user, Followers });
};

const follow = async (req, res) => {
  const following = await Following.create({
    Follower: req.user.UserId,
    following: req.body.id,
  });
  res.status(StatusCodes.OK).json(following);
};

const unfollow = async (req, res) => {
  const following = await Following.findOne({
    where: { Follower: req.user.UserId, following: req.body.id },
  });
  await following.destroy();
  res.status(StatusCodes.OK).json(following);
};

const isFollowed = async (req, res) => {
  const isFollowed = await Following.findOne({
    where: { Follower: req.user.UserId, following: req.params.id },
  });
  res.status(StatusCodes.OK).json({ isFollowed: isFollowed ? true : false });
};

module.exports = {
  getAllUsers,
  register,
  logIn,
  getSingleUser,
  showCurrenUsre,
  verifyEmail,
  follow,
  updateUser,
  updateProfileUser,
  isFollowed,
  unfollow,
};
