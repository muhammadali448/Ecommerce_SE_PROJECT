const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.create = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const { name, description, quantity, price, category } = fields;
    if (!name || !description || !quantity || !price || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }
    try {
      const product = new Product(fields);
      if (files.photo) {
        if (files.photo.size > 1000000) {
          return res.json({ error: "Image should be less than 1mb size" });
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
      const data = await product.save();
      res.json({ data });
    } catch (error) {
      res.json({ error: error.message });
    }
  });
};

exports.updateProduct = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    try {
      let product = req.product;
      product = _.extend(product, fields);
      if (files.photo) {
        if (files.photo.size > 1000000) {
          return res.json({ error: "Image should be less than 1mb size" });
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
      const data = await product.save();
      res.json({ data });
    } catch (error) {
      res.json({ error: error.message });
    }
  });
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.product.id);
    res.json({ message: "Successfully Deleted" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  req.product.photo = undefined;
  res.json({ product: req.product });
};

exports.findProductById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id).exec();
    if (!product) {
      return res.status(404).json({ error: "Product not exist" });
    }
    req.product = product;
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};
