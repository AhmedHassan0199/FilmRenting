const User = require('../models/user');

exports.getUserById = async (userId) => {
  const user = await User.findById(userId).select('firstName lastName');
  return user;
};
