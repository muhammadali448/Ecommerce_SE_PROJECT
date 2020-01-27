const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const CartItemSchema = new mongoose.Schema(
  {
    _id: { type: ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    count: { type: Number, required: true }
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", CartItemSchema);

const OrderSchema = new mongoose.Schema(
  {
    cart: [CartItemSchema],
    transaction_id: {
      type: {},
      required: true
    },
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
    },
    updated: Date,
    user: { type: ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, CartItem };
