import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/carts/");
      setCart(res.data);
    } catch (err) {
      console.log("Error fetching cart:", err.response?.data || err);
    }
  };

  const addToCart = async (productId, selectedColor, selectedSize=null) => {
    if (!selectedColor) {
      alert("Please select color");
      return;
    }
    try {
      await axiosInstance.post("/carts/", {
        product_id: productId,
        selected_color: selectedColor,
        selected_size: selectedSize,
        quantity: 1,
      });
      fetchCart();
      alert("Added to cart!");
    } catch (err) {
      console.log("Add To Cart Error:", err.response?.data || err);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await axiosInstance.delete(`/carts/${cartId}/`);
      fetchCart();
    } catch (err) {
      console.log("Remove error:", err.response?.data || err);
    }
  };

  const updateQty = async (cartId, productId, quantity) => {
    try {
      await axiosInstance.put(`/carts/${cartId}/`, {
        product_id: productId,
        quantity: quantity,
      });
      fetchCart();
    } catch (err) {
      console.log("Quantity update error:", err.response?.data || err);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, fetchCart, addToCart, removeFromCart, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
}
