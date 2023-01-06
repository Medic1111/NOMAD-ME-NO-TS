const { User } = require("../models/models");
const handleAsync = require("../utils/handle_async");
const AppError = require("../utils/app_error");
const sendEmail = require("../utils/send_email");
const { welcomeMsg } = require("../assets/welcome");
const jwt = require("jsonwebtoken");

const registerControl = handleAsync(async (req, res, next) => {
  let user = await User.create(req.body);

  await sendEmail({
    email: req.body.email,
    subject: "Welcome from Nomad-me!",
    message: welcomeMsg,
  })
    .then(async () => {
      await User.findById(user._id).then((user) =>
        res.status(201).json({ user, token: "development_only" })
      );
    })
    .catch((err) => {
      return next(new AppError("Could not send Welcome email", 400));
    });
});

const loginControl = handleAsync(async (req, res, next) => {
  if (!req.body.username || !req.body.password)
    return next(new AppError("Username and password required", 400));

  let user = await User.findOne({ username: req.body.username })
    .populate("posts")
    .select("+password");

  if (!user || !(await user.decrypt(req.body.password, user.password))) {
    return next(new AppError("Incorrect Password or invalid username", 401));
  }
  user.password = null;

  res.status(201).json({ user, token: "development_only" });
});

const validateControl = handleAsync(async (req, res, next) => {
  let token = req.cookies.jwt;

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, tokenSpec) => {
    username = tokenSpec.username;
    await User.findOne({ username }).then((user) =>
      res.status(200).json({ user })
    );
  });
});

const logoutControl = (req, res) => {
  res.cookie("jwt", "loggedout", {
    maxAge: 100,
    secure: true,
    httpOnly: true,
  });
  res.status(200).json({ message: "Loggout out" });
};

const authControl = {
  registerControl,
  loginControl,
  validateControl,
  logoutControl,
};

module.exports = { authControl };
