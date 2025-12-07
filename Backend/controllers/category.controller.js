import db from "../models/index.js";
import slugify from "slugify";
const Category = db.Category;

// CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const { name, parent_id, image, status } = req.body;

    const slug = slugify(name, { lower: true, strict: true });

    const category = await Category.create({
      name,
      slug,
      parent_id,
      image,
      status,
    });

    res.status(200).json({
      categories: category,
      status: 200,
      success: true,
      message: "Category created successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      status: 500,
      success: false,
      message: "Failed to create category",
    });
  }
};

// GET ALL CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.status(200).json({
      categories: categories,
      status: 200,
      success: true,
      message: "Categories fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      status: 500,
      success: false,
      message: "Failed to fetch categories",
    });
  }
};
