import Watchlist from "../models/Watchlist.js";
import Product from "../models/product.model.js";
import { sendResponse } from "../utils/response.js";

export const addToWatchlist = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id } = req.body;

    const existing = await Watchlist.findOne({ where: { user_id, product_id } });
    if (existing) return sendResponse(res, 400, false, "Already in watchlist.");

    const item = await Watchlist.create({ user_id, product_id });

    return sendResponse(res, 201, true, "Added to watchlist", item);

  } catch (error) {
    return sendResponse(res, 500, false, "Error adding watchlist", null, error.message);
  }
};

export const getWatchlist = async (req, res) => {
  try {
    const user_id = req.user.id;

    const items = await Watchlist.findAll({
      where: { user_id },
      include: [{ model: Product }]
    });

    return sendResponse(res, 200, true, "Watchlist fetched", items);

  } catch (error) {
    return sendResponse(res, 500, false, "Error fetching watchlist", null, error.message);
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id } = req.params;

    await Watchlist.destroy({ where: { user_id, product_id } });

    return sendResponse(res, 200, true, "Removed from watchlist");

  } catch (error) {
    return sendResponse(res, 500, false, "Error removing item", null, error.message);
  }
};
