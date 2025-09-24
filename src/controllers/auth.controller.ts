import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { generateTokens } from "../utils";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshsecret";

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;
      const existing = await User.findOne({ email });
      if (existing)
        return res.status(400).json({ message: "Email already exists" });

      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashed, role });
      const tokens = generateTokens(user);
      user.refreshToken = tokens.refreshToken;
      await user.save();
      res.status(201).json({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const matchedPassword = await bcrypt.compare(password, user.password);
      if (!matchedPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const tokens = generateTokens(user);

      // Save refresh token in DB
      user.refreshToken = tokens.refreshToken;
      await user.save();

      // Set refresh token as httpOnly cookie
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // send only over HTTPS in production
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Send only accessToken and user info in response
      return res.status(200).json({
        message: "Login successful",
        accessToken: tokens.accessToken,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  },

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken)
        return res.status(401).json({ message: "No refresh token" });

      const payload: any = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
      const user = await User.findById(payload.id);
      if (!user || user.refreshToken !== refreshToken)
        return res.status(403).json({ message: "Invalid refresh token" });

      const tokens = generateTokens(user);
      user.refreshToken = tokens.refreshToken;
      await user.save();
      res.json({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired refresh token" });
    }
  },
};
