const User = require("../models/user");
const { CartItem, Order } = require("../models/order");
exports.create = async (req, res) => {
  try {
    req.body.user = req.profile._id;
    const order = new Order(req.body);
    const newOrder = await order.save();
    res.json(newOrder);
  } catch (error) {
    res.json({ error: error.message });
  }
};
