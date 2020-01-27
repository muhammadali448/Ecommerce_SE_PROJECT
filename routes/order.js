const express = require("express");
const { requireSigin, isAuth } = require("../controllers/auth");
const { findUserById } = require("../controllers/user");
const { create } = require("../controllers/order");
const router = express.Router();

router.get("/", requireSigin, isAuth);

router.post("/create/:userId", requireSigin, isAuth, create);

router.param("userId", findUserById);
module.exports = router;
