import { Router } from "express";
// import auth from '../../middlewares/auth';
// import { USER_ROLE } from '../../constant';
import { employeeController } from "../../controllers/admin/employeeController";

const adminRouter = Router();

adminRouter.post("/employees/create", employeeController.createEmployee);
adminRouter.get("/employees/list", employeeController.getEmployees);
adminRouter.get("/employees/:id", employeeController.getEmployee);
adminRouter.put("/employees/:id/update", employeeController.updateEmployee);
adminRouter.delete("/employees/:id/delete", employeeController.deleteEmployee);

export default adminRouter;
