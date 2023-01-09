const { User } = require("../models/users");
const { Post } = require("../models/posts");
const AppError = require("../utils/app_error");
const handleAsync = require("../utils/handle_async");
const sendEmail = require("../utils/send_email");
const bcrypt = require("bcrypt");

const getUser = handleAsync(async (req, res, next) => {
  await User.findOne({ _id: req.params.id })
    .populate("posts")
    .then((user) => res.status(200).json({ user }));
});

const deleteUser = handleAsync(async (req, res, next) => {
  const user = await User.findById({ _id: req.params.id }).select("+password");

  if (!user || !(await user.decrypt(req.body.password, user.password))) {
    return next(new AppError("Incorrect Password", 401));
  }
  await Post.deleteMany({ author: req.params.id });
  await User.findByIdAndDelete({ _id: req.params.id }).then(() => {
    res.status(200).json({ message: "User Account Deleted" });
  });
});

const editUserAvatar = handleAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.params.id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .populate("posts")
    .then((update) => {
      res.status(200).json({ user: update });
    });
});

const changePassword = handleAsync(async (req, res, next) => {
  const user = await User.findById({ _id: req.params.id }).select("+password");

  if (!user || !(await user.decrypt(req.body.currentPassword, user.password))) {
    return next(new AppError("Incorrect Password", 401));
  }
  user.password = req.body.newPassword;
  user.change_password_time = new Date().toISOString();
  await user
    .save()
    .then(() => res.status(200).json({ message: "Password Changed" }));
});

const forgotPassword = handleAsync(async (req, res, next) => {
  // SEE IF USER EXISTS
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("Email not registered", 404));
  //  GEN A HASH AND EXP TIME
  const tempCode = `TEMP_PASS${Math.floor(Math.random() * 100000000) + 1}`;
  const hash = await bcrypt.hash(tempCode, 8);
  await user.updateOne({
    temp_password: hash,
    temp_password_exp: new Date().toISOString(),
  });
  // SEND EMAIL TO USER WITH USERNAME AND TEMP PASS
  await sendEmail({
    email: req.body.email,
    subject: "Forgot Password?",
    message: `Hello, ${user.username}. It seems that you have forgotten your password. Here's your temporary code: ${tempCode}
    After logging in, please change your password immediately as this temporary password will not be active for more than 10 minutes.`,
  }).then(() => {
    res
      .status(200)
      .json({ message: "We sent you an Email. Please check your mailbox" });
  });
});

const resetPassword = handleAsync(async (req, res, next) => {
  if (req.body.newPassword !== req.body.newPasswordConfirm)
    return next(new AppError("Passwords don't match", 400));
  // FIND USER WITH SELECTED FIELDS
  let user = await User.findOne({ username: req.body.username }).select(
    "+temp_password +temp_password_exp"
  );
  if (!user || !user.temp_password)
    return next(new AppError("Incorrect username", 404));
  // CHECK IF TEMP PASS EXPIRED
  const msDiff = Math.abs(
    new Date(user.temp_password_exp) - new Date(new Date().toISOString())
  );
  const hourConvertion = msDiff / (60 * 60 * 1000);
  if (hourConvertion >= 0.0625 /*3.25min*/)
    return next(new AppError("Expired temporary password", 401));
  //  VALIDATE TEMP PASS
  const decrypt = await user.decrypt(
    req.body.temp_password,
    user.temp_password
  );
  if (!decrypt) return next(new AppError("Incorrect temp pass", 401));
  // VALID: RESET PASSWORD AND OTHER PROPERTIES
  user.password = req.body.newPassword;
  user.temp_password = null;
  user.temp_password_exp = null;
  user.change_password_time = new Date().toISOString();
  await user.save();
  return res.status(200).json({ message: "Password was reset" });
});

const userControl = {
  getUser,
  deleteUser,
  editUserAvatar,
  changePassword,
  forgotPassword,
  resetPassword,
};

module.exports = { userControl };
