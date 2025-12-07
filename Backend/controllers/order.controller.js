import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Cart from "../models/Cart.js";
import Product from "../models/product.model.js";
import Address from "../models/Address.js";
import { sendResponse } from "../utils/response.js";

// ============================
// PLACE ORDER
// ============================
export const placeOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { address_id, payment_method } = req.body;

    if (!address_id || !payment_method) {
      return sendResponse(
        res,
        400,
        false,
        "address_id & payment_method required"
      );
    }

    // Validate address
    const address = await Address.findOne({
      where: { id: address_id, user_id },
    });

    if (!address) {
      return sendResponse(res, 404, false, "Invalid address");
    }

    // Fetch cart items
    const cartItems = await Cart.findAll({
      where: { user_id },
      include: [{ model: Product }],
    });

    if (cartItems.length === 0) {
      return sendResponse(res, 400, false, "Cart is empty");
    }

    // Calculate total price
    let totalAmount = 0;
    cartItems.forEach((item) => {
      const price = item.Product.sale_price || item.Product.price;
      totalAmount += price * item.quantity;
    });

    // Create order
    const order = await Order.create({
      user_id,
      address_id,
      total_amount: totalAmount,
      payment_method,
      payment_status: payment_method === "COD" ? "pending" : "paid",
      order_status: "pending",
    });

    // Create order items + reduce stock
    for (let cart of cartItems) {
      const price = cart.Product.sale_price || cart.Product.price;

      await OrderItem.create({
        order_id: order.id,
        product_id: cart.product_id,
        quantity: cart.quantity,
        price,
        total: price * cart.quantity,
      });

      // Reduce product stock
      cart.Product.stock -= cart.quantity;
      await cart.Product.save();
    }

    // Clear cart
    await Cart.destroy({ where: { user_id } });

    return sendResponse(res, 201, true, "Order placed successfully", order);
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Failed to place order",
      null,
      error.message
    );
  }
};

// ============================
// GET ALL USER ORDERS
// ============================
export const getUserOrders = async (req, res) => {
  try {
    const user_id = req.user.id;

    const orders = await Order.findAll({
      where: { user_id },
      include: [
        {
          model: OrderItem,
          include: [{ model: Product }],
        },
        { model: Address },
      ],
      order: [["id", "DESC"]],
    });

    return sendResponse(res, 200, true, "Orders fetched successfully", orders);
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Failed to load orders",
      null,
      error.message
    );
  }
};

// ============================
// GET SINGLE ORDER DETAILS
// ============================
export const getOrderDetails = async (req, res) => {
  try {
    const { order_id } = req.params;
    const user_id = req.user.id;

    const order = await Order.findOne({
      where: { id: order_id, user_id },
      include: [{ model: OrderItem, include: [Product] }, { model: Address }],
    });

    if (!order) {
      return sendResponse(res, 404, false, "Order not found");
    }

    return sendResponse(res, 200, true, "Order details loaded", order);
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Failed to load order",
      null,
      error.message
    );
  }
};
