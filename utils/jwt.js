const JWT = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const customError = require('../errors');

const createToken = (res, user) => {
  const { id: UserId, username: username, role: role } = user;
  const token = JWT.sign({ UserId, username, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res
    .status(StatusCodes.OK)
    .cookie('token', token, { httpOnly: true, signed: true })
    .json({ user, token });
};

const verifyToken = (token) => JWT.verify(token, process.env.JWT_SECRET);

module.exports = { createToken, verifyToken };
