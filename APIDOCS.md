# DEV: API DOCS

## Table of contents

- [Packages](#packages)
- [Error Handling](#error-handling)
  - [Error Class](#error-class)
  - [Error Controller](#error-controller)
  - [Operational vs non operation](#operational-vs-non-operational)
  - [Mongoose Errors](#mongoose-errors)
  - [Unhandled Rejections](#unhandled-rejections)
  - [Uncaught Exceptions](#uncaught-exceptions)
- [Encryption/Token](#encryptiondecryptiontokenvalidation)
  - [Encryption](#encryption)
  - [Decryption](#decryption)
  - [Sign Token](#sign-token)
  - [Validate](#validate-middleware)
- [Database seeding](#database-seeding) -[Seed and clear user](#seedclear-user) -[Seed and clear posts](#seedclear-posts)
- [Routes](#routes)
  - [Posts](#posts)
    - [Get all posts](#get-all-posts)
    - [Create new post](#create-new-post)
    - [Get spec post](#get-spec-post)
    - [Delete spec post](#delete-spec-post)
    - [Edit post](#edit-post)
    - [Upvote post](#upvote-post)
    - [Get label spec posts](#get-label-specific-posts)
  - [Users](#users)
    - [Get user](#get-user)
    - [Delete user](#delete-user)
    - [Edit user avatar](#edit-user-avatar)
    - [Forgot pass- temp hash](#forgot-password-get-temp-hash)
    - [Forgot pass- reset](#forgot-password-reset)
    - [Change password](#change-password)
  - [Auth](#auth)
    - [Registration](#register)
    - [Login](#login)
    - [Validate](#validate)
    - [Logout](#logout)
  - [Image](#images)
    - [Upload](#upload)

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

### Error Class

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

### Error Controller

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

### Operational vs Non-Operational

Operational VS Non-Operational errors are displayed differently.
Note also, that for Cast, Duplicate, and Validation errors related to Mongo, different functions get called:

### Mongoose Errors

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

### Unhandled Rejections:

Always catch the errors. This is to serve as a second layer safety net handler:

```
// SAFETY NET UNHANDLED REJECTIONS
// DO NOT RELY: CATCH THE ERRORS
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION: ", err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
```

### Uncaught Exceptions

Always catch the errors. This is to serve as a second layer safety net handler:

```
// SAFETY NET UNCAUGHT EXCEPTIONS
// DO NOT RELY: CATCH THE ERRORS
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXECEPTION: ", err.name, err.message);
  process.exit(1);
});
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

## DATABASE SEEDING:

You can find `mock_data` file inside `db` directory in the `server`.
The mock data needs manipulation as follow:

1- The mock User will have a mongoose ObjectId generated after seeded

- Run `npm run seedDBuser`
- Head to compass and get the user id (string)
- Back to mock, assign the value of `postid` to the user's id
- Now posts are ready to be seeded
- Run `npm run seedDBpost`

### Seed/Clear User

Seed:

- Run `npm run seedDBuser`
  Clear:
- Run `npm run clearDBuser`

### Seed/Clear Posts

Seed:

- Run `npm run seedDBpost`
  Clear:
- Run `npm run clearDBpost`

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

#### Get all posts:

```
# GETS ALL POSTS
GET http://localhost:3002/api/v1/posts HTTP/1.1
Content-Type: application/json

###
```

#### Create new post:

```
# CREATE NEW POST
POST http://localhost:3002/api/v1/posts HTTP/1.1
Content-Type: application/json
Authorization: {{auth}}

{
  "author": {{userId}},
  "url":"https://media.istockphoto.com/id/847714996/photo/miami-beach-florida-usa.jpg?s=612x612&w=0&k=20&c=lT0wFzLOav0uoA8-glWpps552IVbHZaXEGtEtMxjVM8=",
  "title":"TESTING API3",
  "content":"This is my API TEST VAR Post"
}

###
```

#### Get spec post:

```
# GET SPEC POST
GET http://localhost:3002/api/v1/posts/{{specPost}} HTTP/1.1
Content-Type: application/json

###
```

#### Delete spec post:

```
# DELETE SPEC POST
DELETE http://localhost:3002/api/v1/posts/{{specPost}} HTTP/1.1
Content-Type: application/json
Authorization: {{auth}}

{
  "id": {{userId}}
}
###
```

#### Edit Post:

```
# EDIT POST
PATCH http://localhost:3002/api/v1/posts/{{specPost}} HTTP/1.1
Content-Type: application/json
Authorization: {{auth}}

{
  "url":"https://media.istockphoto.com/id/847714996/photo/miami-beach-florida-usa.jpg?s=612x612&w=0&k=20&c=lT0wFzLOav0uoA8-glWpps552IVbHZaXEGtEtMxjVM8=",
  "title":"New Patch From VAR API",
  "content":"This is miami beach, a dream come true for bohemians"
}

###
```

#### Upvote post:

```
# UPVOTE POST
PATCH http://localhost:3002/api/v1/posts/{{specPost}}/up_vote HTTP/1.1
Content-Type: application/json
Authorization: {{auth}}

{
  "username": {{username}}
}

###
```

#### Get label specific posts:

```
###

# GETS ALL LABEL SPECIFIC POSTS
GET http://localhost:3002/api/v1/posts?label={{label}} HTTP/1.1
Content-Type: application/json

###
```

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

#### Get user:

```
# GET USER WITH POSTS
GET http://localhost:3002/api/v1/users/{{userid}} HTTP/1.1
Content-Type: application/json

###
```

#### Delete user:

```
# DELETE USER
DELETE http://localhost:3002/api/v1/users/{{deletableUser}} HTTP/1.1
Content-Type: application/json
Authorization: {{deletableAuth}}

{
  "password": {{deletablePass}}
}
###
```

#### Edit user avatar:

```
# EDIT USER AVATAR
PATCH http://localhost:3002/api/v1/users/{{userid}} HTTP/1.1
Content-Type: application/json
Authorization: {{auth}}

{
  "avatar": "https://st2.depositphotos.com/3143277/8644/i/600/depositphotos_86446164-stock-photo-business-man-in-office.jpg"
}
###
```

#### Forgot password: Get temp hash

```
# FORGOT PASSWORD- Get temp hash
POST http://localhost:3002/api/v1/users/forgot_password HTTP/1.1
Content-Type: application/json

{
  "email": "medictansy@gmail.com"
}
###
```

#### Forgot password: Reset

```
# FORGOT PASSWORD- Verify temp pass and reset password
POST http://localhost:3002/api/v1/users/reset_password HTTP/1.1
Content-Type: application/json

{
  "username": "medicmail",
  "temp_password": "TEMP_PASS50954308",
  "newPassword": "medicmail"
}
###
```

#### Change password:

```
# CHANGE PASSWORD
PATCH  http://localhost:3002/api/v1/users/{{userid}}/new_password HTTP/1.1
Content-Type: application/json
Authorization: {{auth}}

{
  "currentPassword": "currentPass",
  "newPassword": "newPass"
}
###

```

### AUTH:

```
authRouter.route("/login").post(authControl.loginControl);

authRouter.route("/register").post(authControl.registerControl);

authRouter.route("/logout").get(authControl.logoutControl);

authRouter.route("/validate").get(validate, authControl.validateControl);
```

#### Register:

```
# REGISTRATION SUCCESS:
POST http://localhost:3002/api/v1/auth/register HTTP/1.1
Content-Type: application/json

{
  "username": "{{random}}_user_test",
  "password": "111111",
  "email": "{{random}}@kdosakd.com"
}

###
```

#### Login:

```
# LOGIN :
POST http://localhost:3002/api/v1/auth/login HTTP/1.1
Content-Type: application/json

{
  "username": "testing",
  "password": "testing"
}

###
```

#### Validate:

```
# VALIDATE:

GET http://localhost:3002/api/v1/auth/validate HTTP/1.1
Content-Type: application/json
Authorization: {{auth}}

###
```

#### Logout:

```
# LOGOUT

GET http://localhost:3002/api/v1/auth/logout HTTP/1.1
Content-Type: application/json
Authorization: {{auth}}

###
```

### IMAGES:

`uploadRouter.route("/").post(uploadControl);`

#### Upload:

```
POST http://localhost:3002/api/v1/image HTTP/1.1
Content-Type: application/json
```
