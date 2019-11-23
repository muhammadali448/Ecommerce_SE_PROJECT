require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const validator = require("express-validator");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MONGODB conneted");
  })
  .catch(err => {
    console.log("MONGODB ERROR: ",err.message);
  });
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(validator());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server starting at port ${port}`);
});
