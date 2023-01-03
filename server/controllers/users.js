const { User, Post } = require("../models/models");
const handleAsync = require("../utils/handle_async");

const getUser = handleAsync(async (req, res, next) => {
  await User.findOne({ _id: req.params.id })
    .populate("posts")
    .then((user) => res.status(200).json({ user }));
});

const deleteUser = handleAsync(async (req, res, next) => {
  await Post.deleteMany({ username: req.params.username });
  await User.findOneAndDelete({ username: req.params.username }).then(() =>
    res.status(200).json({ message: "User Account Deleted" })
  );
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

const userControl = {
  getUser,
  deleteUser,
  editUserAvatar,
};

module.exports = { userControl };
