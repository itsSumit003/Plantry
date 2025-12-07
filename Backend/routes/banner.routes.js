import express from "express";
import upload from "../middleware/upload.js";
import {
  createBanner,
  getBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
  getActiveBanners
} from "../controllers/banner.controller.js";

const router = express.Router();

router.post("/", upload.single("image"), createBanner);
router.get("/", getBanners);
router.get("/active", getActiveBanners);
router.get("/:id", getBannerById);
router.put("/:id", upload.single("image"), updateBanner);
router.delete("/:id", deleteBanner);

export default router;
