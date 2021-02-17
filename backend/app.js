const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./Middlewares/error");
const path = require('path')
const cors = require('cors')



app.use(cors())
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Routes
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const paymentRoutes = require('./routes/payment');

// Routing
app.get("/", (req, res) => {
  res.status(200).json({ message: "Health check" });
});
app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
  })
}

app.use(errorMiddleware);
module.exports = app;
