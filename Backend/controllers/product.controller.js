import db from "../models/index.js";
import slugify from "slugify";

const Product = db.Product;
const Category = db.Category;

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      sale_price,
      stock,
      category_id,
      status,
    } = req.body;

    // Generate slug
    const slug = slugify(title, { lower: true, strict: true });

    // Check if category exists
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(400).json({
        data: null,
        status: 400,
        success: false,
        message: "Invalid category_id",
      });
    }

    // Create product
    const product = await Product.create({
      title,
      slug,
      description,
      price,
      sale_price,
      stock,
      category_id,
      status,
    });

    return res.status(201).json({
      data: product,
      status: 201,
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          // as: "category",
          attributes: ["id", "name"],
        },
      ],
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      data: products,
      status: 200,
      success: true,
      message: "Products fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      status: 500,
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};
