const createTokenUser = (user) => {
  return { name: user.username, userId: user._id, isAdmin: user.isAdmin };
};

module.exports = createTokenUser;
