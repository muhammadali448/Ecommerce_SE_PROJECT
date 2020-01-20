const express = require("express");
const { requireSigin, isAuth, isAdmin } = require("../controllers/auth");
const { findUserById } = require("../controllers/user");
const {
  create,
  findProductById,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  list,
  listRelatedProduct,
  listProductCategories,
  listSearchProducts,
  productPriceRanges,
  getPhoto
} = require("../controllers/product");
const router = express.Router();

router.post("/create/:userId", requireSigin, isAuth, isAdmin, create);

router.get("/get/:productId", getProduct);
router.get("/getAll", getProducts);
router.get("/getRanges/:categoryId", productPriceRanges);
router.get("/list", list);
router.get("/list/categories", listProductCategories);
router.get("/photo/:productId", getPhoto);
router.get("/list/related/:productId", listRelatedProduct);
router.post("/list/search/products", listSearchProducts);
router.delete(
  "/delete/:productId/:userId",
  requireSigin,
  isAuth,
  isAdmin,
  deleteProduct
);
router.put(
  "/update/:productId/:userId",
  requireSigin,
  isAuth,
  isAdmin,
  updateProduct
);
router.param("userId", findUserById);
router.param("productId", findProductById);
module.exports = router;
