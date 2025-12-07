import React from "react";
import { useCart } from "../context/cart-context.jsx";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white shadow-md rounded-lg border hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      />

      <h3 className="text-xl font-semibold mt-3">{product.name}</h3>
      <p className="text-green-700 font-bold">₹{product.price}</p>

      <button
        onClick={() => addToCart(product.id)}
        className="w-full bg-green-700 text-white mt-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-800 transition"
      >
        <FaShoppingCart /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
