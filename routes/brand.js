const express = require("express");
const { requireSigin, isAuth, isAdmin } = require("../controllers/auth");
const { findCategoryById } = require("../controllers/category");
const { findUserById } = require("../controllers/user");
const {
  create,
  findBrandById,
  getBrand,
  deleteBrand,
  getBrandByCategory,
  updateBrand,
  getList
} = require("../controllers/brand");
const router = express.Router();

router.post(
  "/create/:userId",
  requireSigin,
  isAuth,
  isAdmin,
  create
);
router.delete(
  "/delete/:userId/:brandId",
  requireSigin,
  isAuth,
  isAdmin,
  deleteBrand
);
router.put(
  "/update/:userId/:brandId",
  requireSigin,
  isAuth,
  isAdmin,
  updateBrand
);
router.get("/get/:brandId", getBrand);
router.get("/listByCategory/:categoryId", getBrandByCategory);
router.get("/list", getList);
router.param("brandId", findBrandById);
router.param("categoryId", findCategoryById);
router.param("userId", findUserById);
module.exports = router;
