const express = require("express");
const { AuthController } = require("../controlers");
const { auth, validation, cntrWrapper } = require("../middlewares");

const { joiRegisterSchema, joiLoginSchema } = require("../models/user");

const router = express.Router();

router.post(
  "/register",

  validation(joiRegisterSchema),
  cntrWrapper(AuthController.register)
);
// router.post("/login", validation(joiLoginSchema), cntrWrapper(cntr.login));
// router.get("/logout", auth, cntrWrapper(cntr.logout));

module.exports = router;
