const { User } = require("../models/users");
const { Post } = require("../models/posts");

const handleAsync = require("../utils/handle_async");
const AppError = require("../utils/app_error");

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
  console.log(req.body);
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

const userControl = {
  getUser,
  deleteUser,
  editUserAvatar,
  changePassword,
};

module.exports = { userControl };
