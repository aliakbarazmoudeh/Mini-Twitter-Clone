const customError = require('../errors');

const checkPermission = (localUser, foreignUserId) => {
  console.log(localUser);
  console.log();
  console.log(foreignUserId);
  if (localUser.role === 'admin') return;
  if (localUser.UserId === foreignUserId) return;
  throw new customError.UnauthorizedError(
    'you dont have access, invalid credentials'
  );
};

module.exports = checkPermission;
