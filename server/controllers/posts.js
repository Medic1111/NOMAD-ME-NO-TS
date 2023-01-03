const { Post, User } = require("../models/models");
const AppError = require("../utils/app_error");
const handleAsync = require("../utils/handle_async");

// POSTS

const getAllPosts = handleAsync(async (req, res, next) => {
  if (req.query.label)
    return await Post.find({ label: req.query.label }).then((posts) =>
      res.status(200).json(posts)
    );
  await Post.find().then((posts) => res.status(200).json(posts));
});

const newPost = handleAsync(async (req, res, next) => {
  await (await Post.create(req.body))
    .populate({ path: "author", select: "-__v -email" })
    .then((newPost) => res.status(201).json(newPost));
});

// POST

const getSpecPost = handleAsync(async (req, res, next) => {
  await Post.findById(req.params.id).then((post) => res.status(200).json(post));
});

const deleteSpecPost = handleAsync(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.id).then((post) => {
    if (!post) return next(new AppError("No Post Found", 404));
    res.status(200).json("Deleted");
  });
});

const editSpecPost = handleAsync(async (req, res, next) => {
  await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).then((post) => {
    if (!post) return next(new AppError("No Post Found", 404));
    res.status(200).json(post);
  });
});

const upvoteSpecPost = handleAsync(async (req, res, next) => {
  let update = await Post.findById(req.params.id);
  if (!update) return next(new AppError("No Post Found", 404));

  const user = await User.findOne({ username: req.body.username });

  const alreadyVoted = update.up_by.find((userRet) => userRet.id === user.id);

  if (alreadyVoted) {
    let filter = update.up_by.filter((userRet) => userRet.id !== user.id);
    update.up_by = filter;
  } else {
    update.up_by.push(user._id);
  }

  await update.save().then((newPost) => res.status(200).json(newPost));
});

const postsControl = {
  getAllPosts,
  newPost,
  getSpecPost,
  deleteSpecPost,
  editSpecPost,
  upvoteSpecPost,
};

module.exports = { postsControl };
