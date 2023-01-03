const handleAsync = require("./handle_async");
const jwt = require("jsonwebtoken");
const AppError = require("./app_error");
const { User } = require("../models/models");

const validate = handleAsync(async (req, res, next) => {
  let token;
  let tokenTimeStamp;
  let username;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.slice(7);
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) return next(new AppError("No token provided", 403));

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, tokenSpec) => {
    username = tokenSpec.username;
    tokenTimeStamp = tokenSpec.iat;
    if (err) return next(new AppError("Invalid or expired token", 403));
  });

  let user = await User.findOne({ username: username }).select(
    "+change_password_time"
  );
  if (!user) return next(new AppError("User no longer registered", 404));

  if (user.alteredPassAfterToken(tokenTimeStamp, user.change_password_time))
    return next(
      new AppError("User recently changed password, login is required", 403)
    );

  // req.user = user
  next();
});
module.exports = validate;
