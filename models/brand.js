const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Brand", brandSchema);
