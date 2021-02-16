
const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandling');

exports.registerUser = async (req, res, next) => {

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 1,
      url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp4540682.jpg&imgrefurl=https%3A%2F%2Fwallpapercave.com%2Fprofile-pictures-wallpapers&tbnid=F6Jj4D3Hg2_L6M&vet=12ahUKEwiA4Ly9qO7uAhUIGnIKHRXKA3QQMygAegUIARDZAQ..i&docid=714nUljS_EVtmM&w=1000&h=1250&q=profile%20pics&ved=2ahUKEwiA4Ly9qO7uAhUIGnIKHRXKA3QQMygAegUIARDZAQ'
    }
  })
  
  const token = user.getJwtToken()
  res.status(201).json({
    token
  })

}