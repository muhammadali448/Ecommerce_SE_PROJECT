const express = require("express");
const { requireSigin, isAuth, isAdmin } = require("../controllers/auth");
const { findUserById } = require("../controllers/user");
const {
  create,
  findProductById,
  getProduct,
  deleteProduct,
  updateProduct,
  list,
  listRelatedProduct
} = require("../controllers/product");
const router = express.Router();

router.post("/create/:userId", requireSigin, isAuth, isAdmin, create);

router.get("/get/:productId", getProduct);
router.get("/list", list);
router.get("/list/related/:productId", listRelatedProduct);
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
