import express from "express";
import { createRole, getRoles } from "../controllers/role.controller.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/", adminAuth, createRole);
router.get("/", adminAuth, getRoles);

export default router;
