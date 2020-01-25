const express = require("express");
const { requireSigin, isAuth } = require("../controllers/auth");
const { findUserById } = require("../controllers/user");
const { getTokenBraintree, checkoutBraintree } = require("../controllers/payment");
const router = express.Router();

router.get(
  "/braintree/getToken/:userId",
  requireSigin,
  isAuth,
  getTokenBraintree
);

router.post(
    "/braintree/checkout/:userId",
    requireSigin,
    isAuth,
    checkoutBraintree
  );

router.param("userId", findUserById);
module.exports = router;
