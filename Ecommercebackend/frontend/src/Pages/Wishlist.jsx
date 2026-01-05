import React, { useContext } from "react";
import { WishlistContext } from "../Context/WishlistContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  if (!wishlist || wishlist.length === 0)
    return <h2 className="text-center mt-10">Wishlist is empty</h2>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded shadow flex flex-col items-center"
          >
            <img
              src={item.product.images[0]?.image}
              alt={item.product.name}
              className="w-40 h-40 object-cover mb-2"
            />
            <h3 className="font-semibold">{item.product.name}</h3>
            <p className="text-gray-600">${item.product.price}</p>
            <button
              className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => removeFromWishlist(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
