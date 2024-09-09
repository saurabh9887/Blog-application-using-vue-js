import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

router.put("/edit/:id", async (req, res) => {
  try {
    const currUser = await User.findById(req.params.id);
    if (!currUser) {
      return res.status(404).send("User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username || currUser.username,
          email: req.body.email || currUser.email,
          password: req.body.password || currUser.password,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    res.status(200).json(foundUser);
  } catch (error) {
    console.log(error);
  }
});

export default router;
