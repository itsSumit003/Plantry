import Cart from "../models/Cart.js";
import Product from "../models/product.model.js";
import { sendResponse } from "../utils/response.js";

export const addToCart = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id, quantity } = req.body;

    let item = await Cart.findOne({ where: { user_id, product_id } });

    if (item) {
      item.quantity += quantity || 1;
      await item.save();
    } else {
      item = await Cart.create({
        user_id,
        product_id,
        quantity: quantity || 1,
      });
    }

    return sendResponse(res, 201, true, "Added to cart", item);
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Error adding cart",
      null,
      error.message
    );
  }
};

export const getCart = async (req, res) => {
  try {
    const user_id = req.user.id;

    const items = await Cart.findAll({
      where: { user_id },
      include: [{ model: Product }],
    });

    return sendResponse(res, 200, true, "Cart fetched", items);
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Error fetching cart",
      null,
      error.message
    );
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id } = req.params;

    await Cart.destroy({ where: { user_id, product_id } });

    return sendResponse(res, 200, true, "Removed from cart");
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Error removing cart item",
      null,
      error.message
    );
  }
};
