const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')

const errorMiddleware = require('./Middlewares/error')


app.use(express.json());
app.use(cookieParser())
// Routes
const productRoutes = require('./routes/product')
const authRoutes = require('./routes/auth')


// Routing
app.get('/', (req, res) => {
  res.status(200).json({ message: "Health check" })
})
app.use('/api', productRoutes)
app.use('/api',authRoutes)

app.use(errorMiddleware)
module.exports = app