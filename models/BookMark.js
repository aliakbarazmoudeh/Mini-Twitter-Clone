const { DataTypes } = require('sequelize');
const sequelize = require('../db/connectDB');

const BookMark = sequelize.define(
  'BookMark',
  {
    tweetId: {
      type: DataTypes.INTEGER,
      allowNull: null,
    },
  },
  { timestamps: false, updatedAt: false, createdAt: false }
);

module.exports = BookMark;
