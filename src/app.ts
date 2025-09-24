import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// === MIDDLEWARES ===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// === CORS CONFIGURATION ===
// Allow requests from frontend (localhost:3000) with cookies
app.use(
  cors({
    origin: "http://localhost:3000", // frontend origin
    credentials: true, // allow cookies and auth headers
  })
);

// === ROUTES ===
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to the EMSXPERT Backend API!");
});

// === DB CONNECTION & SERVER START ===
mongoose
  .connect(process.env.MONGODB_URI || "", {})
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("🚀 Server running on port", process.env.PORT || 8000);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

export default app;
