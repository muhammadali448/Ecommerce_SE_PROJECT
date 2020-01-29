const express = require("express");
const { requireSigin, isAuth, isAdmin } = require("../controllers/auth");
const router = express.Router();
const {
  findUserById,
  secret,
  getPurchaseOrderHistory,
  readUserInfo,
  updateUserInfo
} = require("../controllers/user");

router.get("/:userId", requireSigin, isAuth, readUserInfo);
router.put("/:userId", requireSigin, isAuth, updateUserInfo);
router.get("/order/history/:userId", requireSigin, isAuth, getPurchaseOrderHistory);
router.get("/secret/:userId", requireSigin, isAuth, isAdmin, secret);
router.param("userId", findUserById);

module.exports = router;
