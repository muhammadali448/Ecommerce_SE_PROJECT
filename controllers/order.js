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

exports.findOrderById = async (req, res, next, id) => {
  try {
    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
    }
    req.order = order;
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.getStatusValues = async (req, res) => {
  try {
    const statusValues = Order.schema.path("status").enumValues;
    res.json(statusValues);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.updateStatusValue = async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        $set: { status: req.body.status }
      },
      { new: true }
    );
    if (!updateOrder) {
      return res.status(400).json({ error: "Orders not updated" });
    }
    res.json(updateOrder);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "_id, name")
      .sort("-createdAt")
      .exec();
    if (!orders) {
      return res.status(404).json({ error: "Orders not exist" });
    }
    res.json(orders);
  } catch (error) {
    res.json({ error: error.message });
  }
};
