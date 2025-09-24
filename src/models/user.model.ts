import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "admin" | "manager" | "employee";
  refreshToken?: string;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      default: "admin",
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export default model("User", UserSchema);
