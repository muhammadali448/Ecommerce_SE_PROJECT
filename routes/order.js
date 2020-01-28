const express = require("express");
const { requireSigin, isAuth, isAdmin } = require("../controllers/auth");
const { findUserById, addOrderToUserHistory } = require("../controllers/user");
const {
  create,
  list,
  getStatusValues,
  updateStatusValue,
  findOrderById
} = require("../controllers/order");
const { decreaseQuantityandIncreaseSold } = require("../controllers/product");
const router = express.Router();

router.get("/list/:userId", requireSigin, isAuth, isAdmin, list);
router.get(
  "/list/statusValues/:userId",
  requireSigin,
  isAuth,
  isAdmin,
  getStatusValues
);

router.put(
  "/statusValue/:userId/update/:orderId",
  requireSigin,
  isAuth,
  isAdmin,
  updateStatusValue
);

router.post(
  "/create/:userId",
  requireSigin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantityandIncreaseSold,
  create
);

router.param("userId", findUserById);
router.param("orderId", findOrderById);
module.exports = router;
