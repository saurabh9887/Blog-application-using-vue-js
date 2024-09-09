import mongoose from "mongoose";

const userModel = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("Users", userModel);
