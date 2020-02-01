const Brand = require("../models/brand");
exports.create = async (req, res) => {
  try {
    const existBrand = await Brand.findOne({
      category: req.body.category,
      name: req.body.name
    });
    if (existBrand) {
      return res.status(403).json({ error: "Brand already exist" });
    }
    const brand = new Brand(req.body);
    const data = await brand.save();
    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.getBrand = async (req, res) => {
  res.json(req.brand);
};

exports.deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.brand._id);
    res.json({ message: "Successfully Deleted" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.getBrandByCategory = async (req, res) => {
  try {
    const brands = await Brand.find({ category: req.category._id })
      .select("name _id")
      .exec();
    if (brands.length === 0) {
      return res
        .status(404)
        .json({ error: "Brands not exist for this category" });
    }
    res.json(brands);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.getList = async (req, res) => {
  try {
    const data = await Brand.find().exec();
    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const brand = req.brand;
    brand.name = req.body.name;
    const updatedBrand = await category.save();
    res.json(updatedBrand);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.findBrandById = async (req, res, next, id) => {
  try {
    const brand = await Brand.findById(id).exec();
    if (!brand) {
      return res.status(404).json({ error: "Brand not exist" });
    }
    req.brand = brand;
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};
