// GENERAL PACKAGES
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const AppError = require("./utils/app_error");
require("dotenv").config();
const app = express();

// MIDDLEWARES:
// Cloudinary Config for image upload
cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
});
// Setting security HTTP Headers
app.use(helmet());
// Limiting against brute force
const limiter = rateLimit({
  max: 300,
  window: 60 * 60 * 1000,
  message: "Too many requests from this IP, try again in an hour",
});
app.use("/api", limiter);
// Logger for development
process.env.NODE_ENV === "development" && app.use(morgan("dev"));
// Limiting/Parsing Body/Cookie
app.use(express.json({ limit: "10kb" }));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
app.use(cookieParser());
// Cross-origin
app.use(cors({ origin: "*" }));
// Data sanatization against NOSQL Query Injection
app.use(mongoSanitize());
// Data sanatization against XSS
// PREVENTED FOR NOW SO TEXT EDITOR CAN BE
// PARSED ON THE CLIENT
// app.use(xss());
// Preventing params/query polution
app.use(hpp());
// Using static files
app.use(express.static(path.resolve(__dirname, "../client/build")));

// PERSONAL MIDDLEWARES
const errController = require("./controllers/errController");
const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const uploadRouter = require("./routes/upload");

// ROUTES
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/image", uploadRouter);

// UNIVERSAL/UNHANDLED ROUTES
if (process.env.NODE_ENV === "production") {
  app.all("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
  );
} else {
  app.all("*", (req, res, next) => {
    next(new AppError(`${req.originalUrl} is not supported`, 404));
  });
}

// ERR MIDDLEWARE/CONTROLLER
app.use(errController);

module.exports = app;
