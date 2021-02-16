const ErrorHandler = require('../utils/errorHandling');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  
  res.status(err.statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error'
})
}