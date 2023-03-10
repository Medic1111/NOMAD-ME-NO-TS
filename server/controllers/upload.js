const handleAsync = require("../utils/handle_async");
const AppError = require("../utils/app_error");
const cloudinary = require("cloudinary");
const path = require("path");

const uploadControl = handleAsync(async (req, res, next) => {
  if (!req.files)
    return next(new AppError("No image to upload, select one", 404));

  let image = req.files.image;
  let uploadPath = path.resolve(__dirname, "../assets", image.name);

  image
    .mv(uploadPath)
    .then(async () => {
      await cloudinary.uploader.upload(uploadPath).then((result) => {
        res.status(200).json(result.url);
      });
    })
    .catch((err) => {
      return next(new AppError("Failed to upload, try again", 500));
    });
});

module.exports = { uploadControl };
