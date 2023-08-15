import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./connect.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
// Middlewares
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cors());
app.use(cookieParser());
// Routes
app.use("/", userRoutes);
app.use("/profile", profileRoutes);
app.use("/post", postRoutes);
// Connect Database
connectToDatabase();
// Spin up server
app.listen(3001, () => {
  console.log("SERVER IS WORKING");
});
