const authRouter = require("express").Router();
const { authControl } = require("../controllers/auth");
const validate = require("../utils/validate");
const attachCookie = require("../utils/attach_cookie");

authRouter.route("/login").post(attachCookie, authControl.loginControl);
authRouter.route("/register").post(attachCookie, authControl.registerControl);
authRouter.route("/logout").get(authControl.logoutControl);
authRouter.route("/validate").get(validate, authControl.validateControl);

module.exports = authRouter;
