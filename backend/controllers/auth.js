const User = require('../models/user');
const sendToken = require('../utils/jwt');
const ErrorHandler = require('../utils/errorHandling');

const cloudinary = require('cloudinary');

//Regsistering user
exports.registerUser = async (req, res, next) => {

  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: "scale"
})

  const { name, email, password ,role} = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url
    },
    role
  })
  
  sendToken(user, 200, res)
}

// Login
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Checks if email and password is entered by user
  if (!email || !password) {
      return next(new ErrorHandler('Please enter email & password', 400))
  }

  // Finding user 
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
      return next(new ErrorHandler('Invalid Email or Password', 401));
  }

  // Checks user
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
      return next(new ErrorHandler('Invalid Email or Password', 401));
  }

  sendToken(user, 200, res)
 
}

// Logout
exports.logoutUser = async (req, res, next) => {
  res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true
  }) 

  res.status(200).json({
      success: true,
      message: 'Logged out'
  })
}

exports.getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
      success: true,
      user
  })
}

exports.updateProfile = async (req, res, next) => {
  const newUserData = {
      name: req.body.name,
      email: req.body.email
  }
  
  //update profilepic
  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id)

    const image_id = user.avatar.public_id;
    const res = await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: "scale"
    })

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url
    }
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
})

res.status(200).json({
    success: true
})
}

exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check previous password
  const isMatched = await user.comparePassword(req.body.oldPassword)
  if (!isMatched) {
      return next(new ErrorHandler('Old password is incorrect'),400);
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res)

}

//Get all users
exports.getAllUsers =async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
      success: true,
      users
  })
} 

exports.deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  await user.remove();

  res.status(200).json({
      success: true,
  })
}