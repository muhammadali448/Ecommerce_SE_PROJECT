const express = require("express");
const { requireSigin, isAuth, isAdmin } = require("../controllers/auth");
const router = express.Router();
const { findUserById, secret, readUserInfo, updateUserInfo } = require("../controllers/user");

router.get("/:userId", requireSigin, isAuth, readUserInfo);
router.put("/:userId", requireSigin, updateUserInfo);
router.get("/secret/:userId", requireSigin, isAuth, isAdmin, secret);
router.param("userId", findUserById);

module.exports = router;
