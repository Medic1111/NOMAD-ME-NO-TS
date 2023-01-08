# DEV: API DOCS

## Table of contents

- [Packages](#packages)
- [Error Handling](#error-handling)
- [Encryption/Token](#encryptiondecryptiontokenvalidation)
  - [Encryption](#encryption)
  - [Decryption](#decryption)
  - [Sign Token](#sign-token)
  - [Validate](#validate-middleware)
- [Routes](#routes)
  - [Posts](#posts)
  - [Users](#users)
  - [Auth](#auth)
  - [Image](#images)

## Packages:

[Express:](https://expressjs.com/) This is an express server

[Morgan:](https://github.com/expressjs/morgan) Available in development mode for logging purposes

[Cors:](https://github.com/expressjs/cors#readme) Configured universally

[Express-rate-limit:](https://github.com/express-rate-limit/express-rate-limit) 300 calls an hour is the current set-up limit.

[Helmet:](https://helmetjs.github.io/) standard configuration out of the box for security, with added config for images reading from sources other than 'self'.

[Mongo-Sanitize:](https://www.npmjs.com/package/mongo-sanitize) Data sanatization against NOSQL Query Injection.

[XSS:](https://www.npmjs.com/package/xss) Currently imported but withheld due to Client Text Editor parsing compromise.

[HPP:](https://www.npmjs.com/package/hpp) Prevention of params/query polution.

[CookieParser:](https://www.npmjs.com/package/cookie-parser) Parsing of cookies.

[Cloudinary:](https://cloudinary.com/documentation/node_integration) Image upload hosting.

[Express-fileupload:](https://www.npmjs.com/package/express-fileupload) Handles image uploads.

[DOTENV:](https://www.npmjs.com/package/dotenv) Management of Env variables

[BCRYPT:](https://www.npmjs.com/package/bcrypt) Encryption and decryption

[JSONWEBTOKEN:](https://www.npmjs.com/package/jsonwebtoken) Handles token signing and verification

[NODEMAILER:](https://nodemailer.com/about/) Sends emails to registered users

[SENDGRID:](https://sendgrid.com/solutions/email-api/) Cloud-based SMTP provider

## ERROR HANDLING:

In `app.js` the last middleware handles errors:

```
// ERR MIDDLEWARE/CONTROLLER
app.use(errController);
```

It uses the class `AppError` found in `utils`:

```
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "Fail" : "Error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

```

In `constrollers` directory you can find the `errController`

```
const errController = (err, req, res, next) => {
  console.log(err);
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

```

Operational VS Non-Operational errors are displayed differently.
Note also, that for Cast, Duplicate, and Validation errors related to Mongo, different functions get called:

```
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

```

## ENCRYPTION/DECRYPTION/TOKEN/VALIDATION

### Encryption:

- Handled by Mongo Schema pre-save:

```
userSchema.pre("save", async function (next) {
  const hash = bcrypt.hash(this.password, 12);
  this.password = await hash;
  next();
});

```

### DECRYPTION:

- Handle by Mongo Schema as a method:

```
userSchema.methods.decrypt = async function (canditate, storedPassword) {
  return await bcrypt.compare(canditate, storedPassword);
};
```

### SIGN TOKEN:

Util function:

```
const signToken = (username) => {
  return jwt.sign({ username: username }, process.env.TOKEN_SECRET, {
    expiresIn: "1hr",
  });
};
```

### VALIDATE MIDDLEWARE:

Attached to sensitive routes that requires authentication, its found in `utils` as well:

```
const validate = handleAsync(async (req, res, next) => {
  let token;
  let tokenTimeStamp;
  let username;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.slice(7);
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) return next(new AppError("No token provided", 403));

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, tokenSpec) => {
    username = tokenSpec.username;
    tokenTimeStamp = tokenSpec.iat;
    if (err) return next(new AppError("Invalid or expired token", 403));
  });

  let user = await User.findOne({ username: username }).select(
    "+change_password_time"
  );
  if (!user) return next(new AppError("User no longer registered", 404));

  if (user.alteredPassAfterToken(tokenTimeStamp, user.change_password_time))
    return next(
      new AppError("User recently changed password, login is required", 403)
    );
  next();

```

## ROUTES:

`/api/v1/posts`
`/api/v1/auth`
`/api/v1/users`
`/api/v1/image`

### POSTS:

```
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
```

> Get posts accepts the following query: label. Used to filter posts by label color

### USERS:

```
userRouter
  .route("/:id")
  .get(userControl.getUser)
  .patch(validate, userControl.editUserAvatar)
  .delete(validate, userControl.deleteUser);

userRouter
  .route("/:id/new_password")
  .patch(validate, userControl.changePassword);

```

### AUTH:

```
authRouter.route("/login").post(authControl.loginControl);

authRouter.route("/register").post(authControl.registerControl);

authRouter.route("/logout").get(authControl.logoutControl);

authRouter.route("/validate").get(validate, authControl.validateControl);
```

### IMAGES:

`uploadRouter.route("/").post(uploadControl);`
