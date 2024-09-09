import mongoose from "mongoose";

const NotesModel = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
});

export const Notes = mongoose.model("Notes", NotesModel);
