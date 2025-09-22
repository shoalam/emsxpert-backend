import { Router } from "express";
import { employeeController } from "../controllers/admin/employeeController";
import { isAdmin } from "../middlewares/admin";

const router = Router();

router.post("/", isAdmin, employeeController.createEmployee); // Admin only
router.get("/", employeeController.getEmployees);
router.get("/:id", employeeController.getEmployee);
router.put("/:id", isAdmin, employeeController.updateEmployee); // Admin only
router.delete("/:id", isAdmin, employeeController.deleteEmployee); // Admin only

export default router;
