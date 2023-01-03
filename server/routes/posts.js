const postsRouter = require("express").Router();
const { postsControl } = require("../controllers/posts");
const validate = require("../utils/validate");

postsRouter
  .route("/")
  .get(postsControl.getAllPosts)
  .post(validate, postsControl.newPost);
postsRouter
  .route("/:id")
  .get(postsControl.getSpecPost)
  .delete(validate, postsControl.deleteSpecPost)
  .patch(validate, postsControl.editSpecPost);
postsRouter.route("/:id/up_vote").patch(validate, postsControl.upvoteSpecPost);

module.exports = postsRouter;
