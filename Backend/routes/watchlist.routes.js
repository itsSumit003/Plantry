import express from "express";
import { addToWatchlist, getWatchlist, removeFromWatchlist } from "../controllers/watchlist.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticate, addToWatchlist);
router.get("/", authenticate, getWatchlist);
router.delete("/:product_id", authenticate, removeFromWatchlist);

export default router;
