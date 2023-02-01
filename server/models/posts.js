const mongoose = require("mongoose");

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
      maxLength: [26, "Max title chars: 26"],
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
    comments: [
      {
        content: {
          type: String,
          trim: true,
          required: [true, "A Comment must have an image"],
        },
        by: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        date: {
          type: Date,
          default: new Date().toISOString(),
        },
      },
    ],
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

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
