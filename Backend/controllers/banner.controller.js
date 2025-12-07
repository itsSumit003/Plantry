import Banner from "../models/banner.model.js";
import slugify from "slugify";
import { sendResponse } from "../utils/response.js";

// CREATE BANNER (Single image)
export const createBanner = async (req, res) => {
  try {
    const { title, redirect_url, sort_order, is_active } = req.body;

    if (!title) {
      return sendResponse(res, 400, false, "Title is required");
    }

    // Single Image Check
    if (!req.file) {
      return sendResponse(res, 400, false, "Banner image is required");
    }

    const slug = slugify(title, { lower: true, strict: true });

    const imageUrl = `/uploads/${req.file.filename}`;

    const banner = await Banner.create({
      title,
      slug,
      image: imageUrl,
      redirect_url,
      sort_order,
      is_active,
    });

    return sendResponse(res, 201, true, "Banner created successfully", banner);
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

// GET SINGLE BANNER BY ID
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

    // Update fields
    let imageUrl = banner.image;

    // If new image uploaded
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
