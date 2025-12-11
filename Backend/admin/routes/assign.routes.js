import express from "express";
import { assignPermissionToRole } from "../controllers/assign.controller.js";
import { assignRoleToAdmin } from "../controllers/adminRole.controller.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/permission-to-role", adminAuth, assignPermissionToRole);
router.post("/role-to-admin", adminAuth, assignRoleToAdmin);

export default router;
