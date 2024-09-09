import express from "express";
import { Notes } from "../models/notesModel.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/add", upload.array("images", 10), async (req, res) => {
  try {
    const newNote = new Notes({
      title: req.body.title,
      description: req.body.description,
    });

    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map((file) => file.path);
      newNote.images = imagePaths;
    }

    const savedNote = await newNote.save();
    res.status(200).json(savedNote);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allBlogs = await Notes.find({});
    res.status(200).json(allBlogs);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleBlog = await Notes.findById(req.param.id);
    res.status(200).json(singleBlog);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedBlog);
  } catch (error) {
    console.log(error);
  }
});

export default router;
