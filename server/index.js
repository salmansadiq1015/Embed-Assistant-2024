import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import assistantRoute from "./routes/assistantRoute.js";
import filesRoute from "./routes/filesRoute.js";
import threadRoute from "./routes/threadRoute.js";
import messageRoute from "./routes/messageRoute.js";
import botRoute from "./routes/botRoutes.js";
import userInfoRoute from "./routes/userInfoRoutes.js";
import analyticsRoute from "./routes/analyticsRoutes.js";
import layoutRoute from "./routes/layoutRoutes.js";
import contactRoute from "./routes/contactRoute.js";
import commentRoute from "./routes/commentRoute.js";
import scrapRoute from "./routes/scrapRoutes.js";

// Dotenv Config
dotenv.config();

// Database Config

// Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Database
connectDB();

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/assistant", assistantRoute);
app.use("/api/v1/files", filesRoute);
app.use("/api/v1/thread", threadRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/bot", botRoute);
app.use("/api/v1/userInfo", userInfoRoute);
app.use("/api/v1/analytics", analyticsRoute);
app.use("/api/v1/layout", layoutRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/scrap", scrapRoute);

// Rest API
app.use("/", (req, res) => {
  res.send(
    `<h1 style="color: rgb(204, 0, 255);">AssalamoAlaikum, App is runing😇!...</h1>`
  );
});

// Linten
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgMagenta.white);
});
