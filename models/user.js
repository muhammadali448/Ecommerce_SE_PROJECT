const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    hashPassword: {
      type: String,
      required: true
    },
    about: {
      type: String,
      trim: true
    },
    salt: {
      type: String
    },
    admin: {
      type: Boolean,
      default: false
    },
    history: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
);

userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    // uuid generate random string
    this.salt = uuidv1();
    this.hashPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  authenticate: function(password) {
    return this.encryptPassword(password) === this.hashPassword;
  },
  encryptPassword: function(password) {
    if (!password) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  }
};

module.exports = mongoose.model("User", userSchema);
