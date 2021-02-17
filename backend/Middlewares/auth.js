const User = require('../models/user')
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandling");


exports.isUserAuthenticated = async (req, res, next) => {

  const { token } = req.cookies

  if (!token) {
      return next(new ErrorHandler('Login to access', 401))
  }

  const user = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findById(user.id);

  next()
}

exports.isUserAuthorized = (...roles) => {
  return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
          return next(
              new ErrorHandler(`For ${req.user.role}, access is denied`, 403))
      }
      next()
  }
}