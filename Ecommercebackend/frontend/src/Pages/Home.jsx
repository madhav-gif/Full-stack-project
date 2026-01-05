import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { CartContext } from "../Context/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products/");
        setProducts(res.data);
      } catch (err) {
        console.log("Error fetching products:", err.response?.data || err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-5 md:p-10">
      <h1 className="text-2xl font-semibold mb-5">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6">
        {products.map((item) => (
          <div key={item.id} className="border rounded-lg shadow hover:shadow-lg p-4">
            
            <Link to={`/product/${item.id}`}>
              <img
                src={item.images?.[0]?.image || "/placeholder.png"}
                alt={item.name}
                className="w-full h-64 object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
              <p className="text-gray-600">₹{item.price}</p>
            </Link>

            <button
              onClick={() => addToCart(item.id, item.colors?.[0] || "default", item.sizes?.[0] || "M")}
              className="mt-3 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition w-full"
            >
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
