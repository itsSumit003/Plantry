import Banner from "../models/banner.model.js";
import slugify from "slugify";
import { sendResponse } from "../utils/response.js";

// CREATE BANNER (Multiple images - Each with unique slug)
export const createBanner = async (req, res) => {
  try {
    const { title, redirect_url, sort_order, is_active } = req.body;

    if (!title) {
      return sendResponse(res, 400, false, "Title is required");
    }

    if (!req.files || req.files.length === 0) {
      return sendResponse(res, 400, false, "At least one banner image is required");
    }

    const banners = [];

    for (const file of req.files) {

      // Base slug
      const baseSlug = slugify(title, { lower: true, strict: true });

      // Unique slug for every image
      const uniqueSlug = `${baseSlug}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

      const imageUrl = `/uploads/${file.filename}`;

      // Create a separate banner record for each image
      const banner = await Banner.create({
        title,
        slug: uniqueSlug,   // <-- unique slug
        image: imageUrl,
        redirect_url,
        sort_order,
        is_active,
      });

      banners.push(banner);
    }

    return sendResponse(
      res,
      201,
      true,
      "Banners created successfully",
      banners
    );

  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Internal server error",
      null,
      error.message
    );
  }
};


// GET ALL BANNERS
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll({
      order: [["sort_order", "ASC"]],
    });

    return sendResponse(res, 200, true, "Banners fetched", banners);
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Internal server error",
      null,
      error.message
    );
  }
};

// GET ACTIVE BANNERS
export const getActiveBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll({
      where: { is_active: true },
      order: [["sort_order", "ASC"]],
    });

    return sendResponse(res, 200, true, "Active banners fetched", banners);
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Internal server error",
      null,
      error.message
    );
  }
};

// GET SINGLE BANNER
export const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);

    if (!banner) {
      return sendResponse(res, 404, false, "Banner not found");
    }

    return sendResponse(res, 200, true, "Banner fetched", banner);
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Internal server error",
      null,
      error.message
    );
  }
};

// UPDATE BANNER (Single image optional)
export const updateBanner = async (req, res) => {
  try {
    const { title, redirect_url, sort_order, is_active } = req.body;

    const banner = await Banner.findByPk(req.params.id);
    if (!banner) {
      return sendResponse(res, 404, false, "Banner not found");
    }

    // Use existing image unless a new one is uploaded
    let imageUrl = banner.image;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    await banner.update({
      title,
      redirect_url,
      sort_order,
      is_active,
      image: imageUrl,
    });

    return sendResponse(res, 200, true, "Banner updated successfully", banner);
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Internal server error",
      null,
      error.message
    );
  }
};

// DELETE BANNER
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);

    if (!banner) {
      return sendResponse(res, 404, false, "Banner not found");
    }

    await banner.destroy();

    return sendResponse(res, 200, true, "Banner deleted");
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Internal server error",
      null,
      error.message
    );
  }
};
