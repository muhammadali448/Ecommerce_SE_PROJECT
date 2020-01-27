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

exports.addOrderToUserHistory = async (req, res, next) => {
  try {
    const { cart, transaction_id, amount } = req.body;
    let history = [];
    cart.forEach(({ _id, name, description, category, count }) => {
      history.push({
        _id,
        name,
        description,
        category,
        quantity: count,
        amount,
        transaction_id
      });
    });
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.profile.id },
      { $push: { history } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({ error: "Could not update the user" });
    }
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.readUserInfo = async (req, res) => {
  req.profile.hashPassword = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.updateUserInfo = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.profile.id },
      { $set: req.body },
      { new: true }
    );
    updatedUser.hashPassword = undefined;
    updatedUser.salt = undefined;
    res.json(updatedUser);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.secret = (req, res) => {
  res.json({ user: req.profile });
};
