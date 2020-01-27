const express = require("express");
const { requireSigin, isAuth } = require("../controllers/auth");
const { findUserById, addOrderToUserHistory } = require("../controllers/user");
const { create } = require("../controllers/order");
const {
  decreaseQuantityandIncreaseSold
} = require("../controllers/product");
const router = express.Router();

router.get("/", requireSigin, isAuth);

router.post(
  "/create/:userId",
  requireSigin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantityandIncreaseSold,
  create
);

router.param("userId", findUserById);
module.exports = router;
