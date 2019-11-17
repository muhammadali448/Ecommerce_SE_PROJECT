const User = require("../models/user");
const {errorHandler} = require("../helpers/dbErrors");

exports.signup = async (req, res) => {
  //   console.log("signup body: ", req.body);
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    user.salt = undefined;
    user.hashPassword =  undefined;
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: errorHandler(error) });
  }
};

