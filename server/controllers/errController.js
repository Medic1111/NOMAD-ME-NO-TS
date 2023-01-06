const AppError = require("../utils/app_error");

// MONGOOSE ERRORS:
const handleCastErrDB = (err) => {
  console.log("CAST ERROR");
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateDB = (err) => {
  console.log("DUPLICATE");
  const message = `Duplicate field. Choose another value`;
  return new AppError(message, 409);
};

const handleValidationDB = (err) => {
  console.log("VALIDATION ERR");
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid Input Data: ${errors}`;
  return new AppError(message, 422);
};

// GLOBAL ERROR CONTROL:

const errController = (err, req, res, next) => {
  process.env.NODE_ENV === "development" && console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };

  if (err.name === "CastError") error = handleCastErrDB(error);
  if (err.code === 11000) error = handleDuplicateDB(error);
  if (err.errors) error = handleValidationDB(error);

  if (err.isOperational) {
    console.log("OPERATIONAL ERROR");
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
    });
  }
  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    error: error,
  });
};

module.exports = errController;
