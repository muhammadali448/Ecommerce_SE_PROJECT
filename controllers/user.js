const User = require("../models/user");

exports.findUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(404).json({ error: "User not exist" });
    }
    req.profile = user;
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.secret = (req, res) => {
    res.json({ user: req.profile });
}
