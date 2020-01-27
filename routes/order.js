const express = require("express");
const { requireSigin, isAuth, isAdmin } = require("../controllers/auth");
const { findUserById, addOrderToUserHistory } = require("../controllers/user");
const { create, list } = require("../controllers/order");
const { decreaseQuantityandIncreaseSold } = require("../controllers/product");
const router = express.Router();

router.get("/list/:userId", requireSigin, isAuth, isAdmin, list);

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
