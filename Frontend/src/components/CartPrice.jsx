import React from "react";
import { useCart } from "../context/cart-context.jsx";

const CartPrice = () => {
  const { cart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white shadow-lg border rounded-lg p-5 h-fit">
      <h2 className="text-2xl font-semibold mb-4">Price Details</h2>

      <div className="flex justify-between text-lg mb-2">
        <span>Total Items:</span>
        <span>{cart.length}</span>
      </div>

      <div className="flex justify-between text-lg mb-4">
        <span>Total Amount:</span>
        <span className="font-bold text-green-700">₹{totalPrice}</span>
      </div>

      <button
        className="w-full bg-green-700 text-white py-2 rounded-lg text-lg hover:bg-green-800 transition"
        onClick={() => alert("Proceed to Checkout…")}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartPrice;
