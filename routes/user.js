const express = require("express");
const { requireSigin, isAuth, isAdmin } = require("../controllers/auth");
const router = express.Router();
const { findUserById, secret } = require("../controllers/user");


router.get("/secret/:userId", requireSigin, isAuth, isAdmin, secret);
router.param("userId", findUserById);

module.exports = router;
