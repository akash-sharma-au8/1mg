const express = require("express");
const app = express();
const env = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./Middlewares/error");
const cors = require('cors')
env.config()

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



app.use(errorMiddleware);
module.exports = app;
