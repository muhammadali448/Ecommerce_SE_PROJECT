const express = require("express");
const { signupValidation, signinValidation } = require("../validation/auth");
const router = express.Router();
const { signup, signin, signout } = require("../controllers/auth");
router.post("/signup", signupValidation, signup);
router.post("/signin", signinValidation, signin);
router.get("/signout", signout);

module.exports = router;
