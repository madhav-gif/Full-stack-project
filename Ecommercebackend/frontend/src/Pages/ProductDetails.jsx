import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch product
  useEffect(() => {
    axiosInstance
      .get(`/products/${id}/`)
      .then((res) => {
        const data = res.data;
        setProduct(data);

        if (data.images?.length > 0) {
          setMainImage(data.images[0].image);
        } else if (data.image) {
          setMainImage(data.image);
        } else {
          setMainImage("/placeholder.png");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log("Product fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  // 🔐 Login check
  const requireLogin = () => {
    const token = localStorage.getItem("access");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return false;
    }
    return true;
  };

  // 🛒 Add to cart
  const handleAddToCart = () => {
    if (!requireLogin()) return;

    if (!selectedColor ) {
      alert("Please select color");
      return;
    }

    addToCart(product.id, selectedColor, selectedSize);
  };

  // ❌ Remove from cart
  const handleRemoveFromCart = () => {
    if (!cartItem) return;
    removeFromCart(cartItem.id);
  };

  // ❤️ Wishlist
  const handleWishlist = () => {
    if (!requireLogin()) return;
    addToWishlist(product.id);
  };

  if (loading) {
    return <h1 className="text-center mt-10 text-xl">Loading...</h1>;
  }

  if (!product) {
    return (
      <h1 className="text-center mt-10 text-red-600">
        Product not found
      </h1>
    );
  }

  // 🔍 Check product + variant in cart
  const cartItem = cart?.find(
    (c) =>
      c.product.id === product.id &&
      c.selected_color === selectedColor &&
      (c.selected_size || "") === (selectedSize || "")
  );

  return (
    <div className="p-6 flex flex-col md:flex-row gap-10">
      {/* 🖼 Images */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          {product.images?.map((img) => (
            <img
              key={img.id}
              src={img.image}
              onClick={() => setMainImage(img.image)}
              className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${
                mainImage === img.image
                  ? "border-blue-600"
                  : "border-gray-300"
              }`}
            />
          ))}
        </div>

        <img
          src={mainImage}
          alt={product.name}
          className="w-96 h-[420px] object-cover rounded-xl shadow"
        />
      </div>

      {/* 📦 Product Info */}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="text-2xl text-blue-600 font-semibold mt-4">
          ₹{product.price}
        </p>

        <p className="mt-4 text-gray-700">
          {product.description}
        </p>

        {/* 🎨 Colors */}
        {product.colors?.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold">Available Colors</h3>
            <div className="flex gap-3 mt-2 flex-wrap">
              {product.colors.map((color, idx) => (
                <span
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-lg cursor-pointer ${
                    selectedColor === color
                      ? "bg-black text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 📏 Sizes */}
        {product.sizes?.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold">Available Sizes</h3>
            <div className="flex gap-3 mt-2 flex-wrap">
              {product.sizes.map((size, idx) => (
                <span
                  key={idx}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg cursor-pointer ${
                    selectedSize === size
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 🔘 Actions */}
        <div className="flex gap-6 mt-10">
          {cartItem ? (
            <button
              onClick={handleRemoveFromCart}
              disabled={!selectedColor}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Remove from Cart ❌
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
            >
              Add to Cart 🛒
            </button>
          )}

          <button
            onClick={handleWishlist}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition"
          >
            ❤️ Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
