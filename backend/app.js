const express = require("express");
const app = express();


const errorMiddleware = require('./Middlewares/error')


app.use(express.json());

// Routes
const productsRoute = require('./routes/product')


// Routing
app.get('/', (req, res) => {
  res.status(200).json({ message: "Health check" })
})
app.use('/api', productsRoute)

app.use(errorMiddleware)
module.exports = app