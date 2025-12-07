import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  placeOrder,
  getUserOrders,
  getOrderDetails,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", authenticate, placeOrder);
router.get("/", authenticate, getUserOrders);
router.get("/:order_id", authenticate, getOrderDetails);

export default router;
