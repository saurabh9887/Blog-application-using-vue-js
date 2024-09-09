import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/userRoute.js";
import notesRoute from "./routes/notesRoute.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/note", notesRoute);
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log(error);
  });

app.listen(3000, () => console.log("App is listening to port 3000"));
