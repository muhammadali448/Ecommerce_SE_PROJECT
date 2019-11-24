const Category = require("../models/category");

exports.create = async (req, res) => {
  try {
    const category = new Category(req.body);
    const data = await category.save();
    res.json({ data });
  } catch (error) {
    res.json({ error: error.message });
  }
};
