const express = require("express");
const { requireSigin, isAuth, isAdmin } = require("../controllers/auth");
const { findUserById } = require("../controllers/user");
const { createValidation } = require("../validation/category");
const {
  create,
  findCategoryById,
  getCategory,
  deleteCategory,
  updateCategory,
  getList
} = require("../controllers/category");
const router = express.Router();

router.post(
  "/create/:userId",
  requireSigin,
  isAuth,
  isAdmin,
  createValidation,
  create
);
router.delete(
  "/delete/:userId/:categoryId",
  requireSigin,
  isAuth,
  isAdmin,
  deleteCategory
);
router.put(
  "/update/:userId/:categoryId",
  requireSigin,
  isAuth,
  isAdmin,
  createValidation,
  updateCategory
);
router.get("/get/:categoryId", getCategory);
router.get("/list", getList);
router.param("categoryId", findCategoryById);
router.param("userId", findUserById);
module.exports = router;
