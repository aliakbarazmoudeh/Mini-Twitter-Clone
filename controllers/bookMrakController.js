const BookMark = require('../models/BookMark');
const Tweet = require('../models/Tweet');
const User = require('../models/User');

const getAllBookMark = async (req, res) => {
  const bookMarks = await BookMark.findAll({
    where: { UserId: req.user.UserId },
    include: [
      {
        model: Tweet,
        attributes: ['text', 'numOfLikes', 'created'],
        include: [{ model: User, attributes: ['name', 'username'] }],
      },
    ],
    attributes: { exclude: ['UserId', 'tweetId'] },
  });
  res.send(bookMarks);
};

const addBookMark = async (req, res) => {
  res.send('addBookMark');
};

const deleteBookMark = async (req, res) => {
  res.send('addBookMark');
};

module.exports = {
  addBookMark,
  deleteBookMark,
  getAllBookMark,
};
