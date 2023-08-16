const express = require("express");
// import express from "express";
// import mongoose from "mongoose";
const cors = require("cors");
// import cors from "cors";
const userRoutes = require("./routes/userRoutes.js");

// import userRoutes from "./routes/userRoutes.js";
const profileRoutes = require("./routes/profileRoutes.js");

// import profileRoutes from "./routes/profileRoutes.js";
const postRoutes = require("./routes/postRoutes.js");

// import postRoutes from "./routes/postRoutes.js";
const cookieParser = require("cookie-parser");

// import cookieParser from "cookie-parser";
const connectToDatabase = require("./connect.js");

// import { connectToDatabase } from "./connect.js";

// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const app = express();
// Middlewares
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(cookieParser());
// Routes
app.use("/", userRoutes);
app.use("/profile", profileRoutes);
app.use("/post", postRoutes);
// Connect Database
connectToDatabase();
// Spin up server
app.listen(3001 || process.env.PORT, () => {
  console.log("SERVER IS WORKING");
});
module.exports = app
