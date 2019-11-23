exports.signupValidation = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req.check("email", "Email is required").notEmpty();
  req.check("email", "Email should be valid").isEmail();
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters")
    .matches(/\d/)
    .withMessage("Password should contain a number");
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.signinValidation = (req, res, next) => {
  req.check("email", "Email is required").notEmpty();
  req.check("email", "Email should be valid").isEmail();
  req.check("password", "Password is required").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
