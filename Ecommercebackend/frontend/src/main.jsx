import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./index.css";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Layout from "./Components/Layout";
import Product from "./Pages/Product";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart"
import Wishlist from "./Pages/Wishlist";
import MyOrders from "./Pages/MyOrders";
import OrderDetail from "./Pages/OrderDetails";
import OrderSuccess from "./Pages/OrderSuccess";
import CategoryProducts from "./Pages/CategoryProducts";

import CartProvider from "./Context/CartContext";
import WishlistProvider from "./Context/WishlistContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Routes>

            {/* PUBLIC */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* WITH NAVBAR */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Product />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/orders/:id" element={<OrderDetail />} />  
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/products/:category" element={<CategoryProducts />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  </StrictMode>
);
