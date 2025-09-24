import { Router } from "express";
import adminRoutes from "./admin/admin.routes";
import authRoutes from "../routes/auth.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;
