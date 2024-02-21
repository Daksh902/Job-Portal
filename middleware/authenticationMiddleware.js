const userModel = require('../models/user');

module.exports = async (req, res, next) => {
  const userId = req.session.userId;
  if (userId) {
    const user = await userModel.getUserById(userId);
    res.locals.currentUser = user; 
  }
  next();
};
