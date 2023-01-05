const userRouter = require("express").Router();
const { userControl } = require("../controllers/users");
const validate = require("../utils/validate");

userRouter
  .route("/:id")
  .get(userControl.getUser)
  .patch(validate, userControl.editUserAvatar)
  .delete(validate, userControl.deleteUser);

userRouter
  .route("/:id/new_password")
  .patch(validate, userControl.changePassword);

module.exports = userRouter;
