const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      trim: true
    },
    brand: {
      type: String,
      required: true
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    sold: {
      type: Number,
      default: 0
    },
    quantity: {
      type: Number,
      required: true
    },
    // photo: {
    //   data: Buffer,
    //   contentType: String
    // },
    photo: {
      url: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      }
    },
    images: [String],
    shipping: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);
