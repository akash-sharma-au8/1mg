const express = require("express");
const app = express();

app.use(express.json());

// Routes
const productsRoute = require('./routes/product')


// Routing
app.get('/', (req, res) => {
  res.status(200).json({ message: "Health check" })
})
app.use('/api', productsRoute)

module.exports = app