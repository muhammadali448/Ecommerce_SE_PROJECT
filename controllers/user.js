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

// exports.getOrderHistory = async (req, res) => {
//   try {
//     const history = await User.findById(req.profile._id).sort("-createdAt").select("");
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// };

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
    const { email, name, currentPassword, newPassword } = req.body;
    // if (!name || name.trim() === "") {
    //   return res.status(400).json({ error: "Name is required" });
    // }
    // if (!email || email.trim() === "") {
    //   return res.status(400).json({ error: "Email is required" });
    // }
    const existUser = await User.findById(req.profile.id);
    if (!existUser) {
      return res.status(404).json({ error: error.message });
    }
    if (!existUser.authenticate(currentPassword)) {
      return res.status(401).json({ error: "Current Password is Incorrect" });
    }
    // const fields = {};
    if (existUser.email !== email) {
      existUser.email = email;
    }
    if (existUser.name !== name) {
      existUser.name = name;
    }
    if (!existUser.authenticate(newPassword)) {
      existUser.password = newPassword;
    }
    const updatedUser = await existUser.save();
    // const updatedUser = await User.findOneAndUpdate(
    //   { _id: req.profile.id },
    //   { $set: { password: "hideit90" } },
    //   { new: true }
    // );
    updatedUser.hashPassword = undefined;
    updatedUser.salt = undefined;
    res.json(updatedUser);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

exports.secret = (req, res) => {
  res.json({ user: req.profile });
};
