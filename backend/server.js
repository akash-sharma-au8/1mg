const app = require('./app')
const env = require("dotenv");

const connectDatabase = require('./config/database')

env.config()

// Connecting to database
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
}) 