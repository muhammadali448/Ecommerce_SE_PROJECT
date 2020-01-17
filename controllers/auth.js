const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = async (req, res) => {
  try {
    const { email } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      const newUser = new User(req.body);
      const user = await newUser.save();
      user.salt = undefined;
      user.hashPassword = undefined;
      return res.status(200).json({ user });
    }
    res.status(400).json({ error: "Email already exist" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not exist" });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Wrong password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { expire: new Date() + 9999 });
    const { _id, admin, name } = user;
    res.json({ token, user: { _id, email: user.email, admin, name } });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Signout successfully" });
};

exports.requireSigin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (!req.profile.admin) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};
