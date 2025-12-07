import express from "express";
import { getAllStates, createState } from "../controllers/state.controller.js";

const router = express.Router();

// Get all states
router.get("/", getAllStates);

// Create new state
router.post("/", createState);

export default router;
