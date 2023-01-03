const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minLength: [5, "Username must be at least 5 chars long"],
      maxLength: [15, "Username must be at most 15 chars long"],
      unique: [true, "Username already in use, choose a different one"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      minLength: [5, "email must be at least 5 chars long"],
      maxLength: [35, "email must be at most 35 chars long"],
      unique: [true, "email already in use, choose a different one"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minLength: [6, "Password must be at least 6 chars long"],
      select: false,
    },
    joinedDate: {
      type: Date,
      default: new Date().toISOString(),
      select: false,
    },
    avatar: {
      type: String,
      trim: true,
      default:
        "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    },
    change_password_time: {
      type: Date,
      default: new Date().toISOString(),
      select: false,
    },
    // posts: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Post",
    //     default: [],
    //   },
    // ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", function (next) {
  if (this.avatar === "") {
    this.avatar =
      "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=";
  }
  next();
});

// VIRTUAL POPULATE
userSchema.virtual("posts", {
  ref: "Post",
  foreignField: "author",
  localField: "_id",
});

userSchema.pre("save", async function (next) {
  const hash = bcrypt.hash(this.password, 12);
  this.password = await hash;
  next();
});

userSchema.methods.decrypt = async function (canditate, storedPassword) {
  return await bcrypt.compare(canditate, storedPassword);
};

userSchema.methods.alteredPassAfterToken = function (
  JWTTimeStamp,
  changePassTime
) {
  return parseInt(changePassTime.getTime() / 1000, 10) > JWTTimeStamp;
};

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: [true, "A post must have an Author"],
    },
    url: {
      type: String,
      trim: true,
      required: [true, "A Post must have an image"],
    },
    title: {
      type: String,
      trim: true,
      maxLength: [18, "Max title chars: 18"],
      minLength: [2, "A post must have a title"],
    },
    content: {
      type: String,
      trim: true,
      maxLength: [2000, "Max title chars: 2000"],
      minLength: [10, "A post must have meaninful content"],
    },
    up_by: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    label: { type: String, default: "none" },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual("voteCount").get(function () {
  return this.up_by.length;
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "up_by",
    select: "-__v -email",
  });
  this.populate({
    path: "author",
    select: "-__v -email",
  });
  next();
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

module.exports = { User, Post };
