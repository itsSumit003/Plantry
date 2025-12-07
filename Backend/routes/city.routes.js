import express from "express";
import { getCitiesByState, createCity } from "../controllers/city.controller.js";

const router = express.Router();

// Get all cities of a state
router.get("/state/:state_id", getCitiesByState);

// Create new city
router.post("/", createCity);

export default router;
