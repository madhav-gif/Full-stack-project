import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await axiosInstance.get("wishlist/");
      setWishlist(res.data);
    } catch (err) {
      console.log("Error fetching wishlist:", err);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await axiosInstance.post("wishlist/", { product_id: productId });
      // Optimistic update
      setWishlist((prev) => [...prev, { product_id: productId }]);
    } catch (err) {
      console.log("Add to Wishlist Error:", err);
    }
  };

  const removeFromWishlist = async (wishlistId) => {
    try {
      await axiosInstance.delete(`wishlist/${wishlistId}/`);
      setWishlist((prev) => prev.filter((item) => item.id !== wishlistId));
    } catch (err) {
      console.log("Remove from Wishlist Error:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) fetchWishlist(); // Only fetch wishlist if logged in
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
