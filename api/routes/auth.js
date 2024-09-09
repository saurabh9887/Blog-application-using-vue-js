import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import upload from "../middleware/upload.js";

const router = express.Router();

const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};

router.post("/register", upload.single("img"), async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    if (req.file) {
      newUser.img = req.file.path;
    }

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const currUser = await User.findOne({ username: req.body.username });
    if (!currUser) res.status(401).send("User not found");
    const validate = await bcrypt.compare(req.body.password, currUser.password);
    if (!validate) {
      res.status(500).send("username or password is not correct!");
    }

    const { password, ...otherInfo } = currUser._doc;
    res.status(200).json(otherInfo);
  } catch (error) {
    console.log(error);
  }
});

export default router;
