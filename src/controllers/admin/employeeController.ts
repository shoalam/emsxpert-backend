import { Request, Response } from "express";
import Employee from "../../models/employee.model";

export const employeeController = {
  // Create Employee
  async createEmployee(req: Request, res: Response) {
    try {
      const employee = await Employee.create(req.body);
      res.status(201).json(employee);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },

  // Get All Employees
  async getEmployees(req: Request, res: Response) {
    try {
      const employees = await Employee.find();
      res.json(employees);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  // Get Employee by ID
  async getEmployee(req: Request, res: Response) {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) return res.status(404).json({ message: "Not found" });
      res.json(employee);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  // Update Employee
  async updateEmployee(req: Request, res: Response) {
    try {
      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!employee) return res.status(404).json({ message: "Not found" });
      res.json(employee);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },

  // Delete Employee
  async deleteEmployee(req: Request, res: Response) {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.id);
      if (!employee) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};
