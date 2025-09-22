import { Schema, model, Document } from "mongoose";

// 1. Interface for use in code
export interface IEmployee extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  password?: string;
  role: "admin" | "manager" | "employee";
  status: "active" | "inactive";
  department?: string;
  dateOfBirth?: Date;
  hiringDate?: Date;
  description?: string;
  emergencyContact?: {
    name?: string;
    phone?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define the schema without passing the generic
const EmployeeSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    phone: { type: String },
    password: { type: String },
    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      default: "employee",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    department: { type: String },
    dateOfBirth: { type: Date },
    hiringDate: { type: Date },
    description: { type: String },
    emergencyContact: {
      name: { type: String },
      phone: { type: String },
    },
  },
  { timestamps: true }
);

const Employee = model("Employee", EmployeeSchema);

export default Employee;
