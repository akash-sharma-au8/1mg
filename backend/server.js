const app = require('./app')
const env = require("dotenv");
const cloudinary = require('cloudinary')
const connectDatabase = require('./config/database')

env.config()

// Connecting to database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
}) 