const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: [true, 'Please enter your name'],
      maxLength: [30, 'Your name cannot exceed 30 characters']
  },
  email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      validate: [validator.isEmail, 'Please enter valid email address']
  },
  password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [6, 'Your password must be longer than 6 characters'],
      select: false
  },
  avatar: {
      public_id: {
          type: String,
          required: true
      },
      url: {
          type: String,
          required: true
      }
  },
  role: {
      type: String,
      enum:{values:['seller','buyer']},
      default: 'buyer'
  },
  createdAt: {
      type: Date,
      default: Date.now
  },
})




// Encrypting password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
      next()
  }

  this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
  });
}

module.exports = mongoose.model('User', userSchema);