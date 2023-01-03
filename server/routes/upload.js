const uploadRouter = require("express").Router();
const { uploadControl } = require("../controllers/upload");

uploadRouter.route("/").post(uploadControl);

module.exports = uploadRouter;
