const authRouter = require("express").Router();
const { authControl } = require("../controllers/auth");
const validate = require("../utils/validate");

authRouter.route("/login").post(authControl.loginControl);
authRouter.route("/register").post(authControl.registerControl);
authRouter.route("/logout").get(authControl.logoutControl);
authRouter.route("/validate").get(validate, authControl.validateControl);

module.exports = authRouter;
