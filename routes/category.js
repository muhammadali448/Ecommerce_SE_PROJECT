const express = require("express");
const { requireSigin, isAuth, isAdmin } = require("../controllers/auth");
const { findUserById } = require("../controllers/user");
const { createValidation } = require("../validation/category");
const { create } = require("../controllers/category");
const router = express.Router();

router.post(
  "/create/:userId",
  requireSigin,
  isAuth,
  isAdmin,
  createValidation,
  create
);
router.param("userId", findUserById);
module.exports = router;
