const { DataTypes } = require('sequelize');
const sequelize = require('../db/connectDB');

const Like = sequelize.define(
  'Like',
  {
    tweetId: {
      type: DataTypes.INTEGER,
      allowNull: null,
    },
  },
  {
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    indexes: [
      {
        unique: true,
        fields: ['UserId', 'tweetId'],
      },
    ],
  }
);

module.exports = Like;
