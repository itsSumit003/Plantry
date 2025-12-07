import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./auth-context.jsx";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [cart, setCart] = useState([]);

  // Load cart when user logs in
  useEffect(() => {
    if (!token || !user) return;
    fetchCart();
  }, [token, user]);

  // GET CART
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/cart/${user.id}`
      );
      setCart(res.data.cart);
    } catch (err) {
      console.log("Cart loading error:", err);
    }
  };

  // ADD TO CART
  const addToCart = async (productId) => {
    try {
      const res = await axios.post("http://localhost:3000/api/cart", {
        userId: user.id,
        productId,
      });

      setCart(res.data.cart);
      toast.success("Added to Cart!");
    } catch (err) {
      toast.error("Failed to add item!");
    }
  };

  // REMOVE ITEM
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/cart/${user.id}/${productId}`
      );

      setCart(res.data.cart);
      toast.success("Removed from Cart");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
