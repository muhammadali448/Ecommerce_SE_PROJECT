require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const validator = require("express-validator");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const paymentRoutes = require("./routes/payment");
const brandRoutes = require("./routes/brand");
const orderRoutes = require("./routes/order");

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
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/brand", brandRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server starting at port ${port}`);
});
