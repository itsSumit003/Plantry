import express from "express";
import { addAddress, getAddressesByUser } from "../controllers/address.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Add new address (Protected)
router.post("/", authenticate, addAddress);

// Get all addresses of a user (Protected)
router.get("/:user_id", authenticate, getAddressesByUser);

export default router;
