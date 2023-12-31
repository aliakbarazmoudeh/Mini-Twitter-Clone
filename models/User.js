const { DataTypes } = require('sequelize');
const sequelize = require('../db/connectDB');
const { hashSync } = require('bcryptjs');
const Tweet = require('./Tweet');
const Following = require('./following');
const BookMark = require('./BookMark');
const Like = require('../models/Like');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: true,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  biography: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  official: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    set(password) {
      this.setDataValue('password', hashSync(password));
    },
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

User.hasMany(Tweet, { foreignKey: 'UserId' });
User.hasMany(Like, { foreignKey: 'UserId' });
User.hasMany(Following, { foreignKey: 'Follower' });
Following.belongsTo(User, {
  as: 'followings',
  foreignKey: 'following',
});
Following.belongsTo(User, {
  as: 'Followers',
  foreignKey: 'Follower',
});
User.hasMany(BookMark, { foreignKey: 'UserId' });
BookMark.belongsTo(Tweet, { foreignKey: 'tweetId' });
Tweet.belongsTo(User, { foreignKey: 'UserId' });

module.exports = User;
