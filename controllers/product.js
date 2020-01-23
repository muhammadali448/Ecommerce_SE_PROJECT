const Product = require("../models/product");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const formidable = require("formidable");
const { rangesOfProductsPrices_project } = require("../helpers/dbQuery");
// const fs = require("fs");
const _ = require("lodash");
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort("-createdAt")
      .exec();
    res.json(products);
  } catch (error) {
    res.json({ error: error.message });
  }
};

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
        const result = await cloudinary.v2.uploader.upload(files.photo.path, {
          public_id: `Ecommerce/${category}/${files.photo.name}`
        });
        product.photo.url = result.secure_url;
        product.photo.id = result.public_id;
        // product.photo.data = fs.readFileSync(files.photo.path);
        // product.photo.contentType = files.photo.type;
      }
      const data = await product.save();
      res.json({ data });
    } catch (error) {
      console.log("error: ", error);
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
        const result = await cloudinary.v2.uploader.upload(files.photo.path, {
          public_id: `Ecommerce/${category}/${files.photo.name}`
        });
        product.photo.url = result.secure_url;
        product.photo.id = result.public_id;
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

// list?sortBy=sold&order=desc&limit=3
// list?sortBy=createdAt&order=desc&limit=3
exports.list = async (req, res) => {
  try {
    const { order, sortBy, limit } = req.query;
    let _order = order ? order : "asc";
    let _sortBy = sortBy ? sortBy : "_id";
    let _limit = limit ? parseInt(limit) : 5;
    const products = await Product.find()
      // .select("-photo")
      .populate("category")
      .sort([[_sortBy, _order]])
      .limit(_limit)
      .exec();
    if (!products) {
      return res.status(404).json({ error: "Products not exist" });
    }
    res.json(products);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.listRelatedProduct = async (req, res) => {
  try {
    const { limit } = req.query;
    const { id, category } = req.product;
    let _limit = limit ? parseInt(limit) : 5;
    const relatedProducts = await Product.find({
      _id: { $ne: id },
      category
    })
      .limit(_limit)
      .populate("category", "_id name")
      .exec();
    if (!relatedProducts) {
      return res.status(404).json({ error: "Related Products not exist" });
    }
    res.json(relatedProducts);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.productPriceRanges = async (req, res) => {
  try {
    var pipeline = [
      {
        $match: {
          category: mongoose.Types.ObjectId(req.params.categoryId)
        }
      }
    ];
    const ranges = await Product.aggregate(pipeline)
      .project(rangesOfProductsPrices_project)
      .group({
        _id: "$range",
        count: { $sum: 1 }
      })
      .project({
        _id: 0,
        range: "$_id",
        count: 1
      });
    res.json(ranges);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.listProductCategories = async (req, res) => {
  try {
    const productCategories = await Product.distinct("category", {});
    if (!productCategories) {
      return res.status(404).json({ error: "Product Categories not exist" });
    }
    res.json(productCategories);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.listSearchProducts = async (req, res) => {
  try {
    const { order, sortBy, productsPerPage, page, filters } = req.body;
    let _order = order ? order : "asc";
    let _sortBy = sortBy ? sortBy : "_id";
    let _productsPerPage = productsPerPage ? parseInt(productsPerPage) : 5;
    let _page = page ? parseInt(page) : 1;
    let findArgs = {};
    for (let key in filters) {
      if (filters[key].length > 0) {
        if (key === "price") {
          // gte -  greater than price [0-10]
          findArgs["$or"] = [];
          filters[key].forEach(pr => {
            findArgs["$or"].push(
              pr[1]
                ? { price: { $gte: pr[0], $lte: pr[1] } }
                : { price: { $gte: pr[0] } }
            );
          });
          // lte - less than

          // findArgs[key] = {
          //   $gte: filters[key][0],
          //   $lte: filters[key][1]
          // };
        } else {
          findArgs[key] = filters[key];
        }
      }
    }
    const filterProducts = await Product.find(findArgs)
      // .select("-photo")
      .populate("category")
      .sort([[_sortBy, _order]])
      .skip(_productsPerPage * _page - _productsPerPage) // (10 * 1) - 1
      .limit(_productsPerPage) // 10
      .exec();
    if (!filterProducts) {
      return res.status(404).json({ error: "Products not exist" });
    }
    const noOfProducts = await Product.count(findArgs);
    res.json({
      currentPage: _page,
      noOfResults: noOfProducts,
      pages: Math.ceil(noOfProducts / _productsPerPage),
      filterProducts
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.search = async (req, res) => {
  const query = {};
  try {
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }
    if (req.query.category && req.query.category != "all") {
      query.category = req.query.category;
    }
    const products = await Product.find(query).populate("category").limit(5).exec();
    res.json(products);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.getPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.contentType(req.product.photo.contentType);
    // res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
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
