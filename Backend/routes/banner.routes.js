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

// Dynamic upload (no limit)
 // Accept either multiple files sent as `images` or a single/multiple file(s) as `image`
 router.post(
   "/",
   upload.fields([
     { name: "images", maxCount: 3 },
     { name: "image", maxCount: 3 },
   ]),
   createBanner
 );

router.get("/", getBanners);
router.get("/active", getActiveBanners);
router.get("/:id", getBannerById);

// Update also supports multiple images
 router.put(
   "/:id",
   upload.fields([
     { name: "images", maxCount: 3 },
     { name: "image", maxCount: 3 },
   ]),
   updateBanner
 );

router.delete("/:id", deleteBanner);

export default router;
