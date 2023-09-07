const { DataTypes } = require('sequelize');
const sequelize = require('../db/connectDB');

const Following = sequelize.define('Following', {
  following: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Following;
