import express from "express";
import { PostModel } from "../models/Posts.js";
import jwt from "jsonwebtoken";
import multer from "multer";
const router = express.Router();
import fs from "fs";
// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  const token = await req.headers.authorization;
  const decodedToken = jwt.verify(token, "secret");
  const { title, summary, content } = req.body;

  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const savedPost = await PostModel.create({
    title,
    summary,
    content,
    image: newPath,
    author: decodedToken.username,
  });

  res.send(savedPost);
});
router.get("/", async (req, res) => {
  const savedPost = await PostModel.find({}).limit(20);

  res.send(savedPost.reverse());
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findById(id);

  res.send(post);
});

export default router;
