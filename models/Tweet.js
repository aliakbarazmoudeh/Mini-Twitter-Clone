const { DataTypes } = require('sequelize');
const sequelize = require('../db/connectDB');

const Tweet = sequelize.define(
  'Tweet',
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    numOfLikes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    created: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true,
      },
    },
  },
  { timestamps: true, updatedAt: true, createdAt: true }
);

module.exports = Tweet;
