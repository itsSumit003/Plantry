import express from "express";
import { createPermission, getPermissions } from "../controllers/permission.controller.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/", adminAuth, createPermission);
router.get("/", adminAuth, getPermissions);

export default router;
