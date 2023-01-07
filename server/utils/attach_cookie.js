const signToken = require("../utils/sign_token");

const attachCookie = (req, res, next) => {
  let token = signToken(req.body.username);
  console.log(token);
  res.cookie("jwt", token, {
    maxAge: 3600000,
    secure: true,
    httpOnly: true,
  });
  next();
};

module.exports = attachCookie;
