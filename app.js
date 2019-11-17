require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
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
    console.log(err.message);
  });

app.use('/api/user', userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server starting at port ${port}`);
});
