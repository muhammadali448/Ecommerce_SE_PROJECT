const Category = require("../models/category");
exports.create = async (req, res) => {
  try {
    const existCat = await Category.findOne({ name: req.body.name });
    if (existCat) {
      return res.status(403).json({ error: "Category already exist" });
    }
    const category = new Category(req.body);
    const data = await category.save();
    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.getCategory = async (req, res) => {
  res.json(req.category);
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.category.id);
    res.json({ message: "Successfully Deleted" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.getList = async (req, res) => {
  try {
    const data = await Category.find().exec();
    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = req.category;
    category.name = req.body.name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.findCategoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id).exec();
    if (!category) {
      return res.status(404).json({ error: "Category not exist" });
    }
    req.category = category;
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};
