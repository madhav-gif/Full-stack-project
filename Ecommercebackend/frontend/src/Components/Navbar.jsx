import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { IoHeart, IoSearch } from "react-icons/io5";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { FaBoxOpen } from "react-icons/fa";

import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  return (
    <header className="shadow-md sticky top-0 bg-gradient-to-r from-orange-50 to-white z-50">
      <nav className="flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold tracking-wide">
          Kr<span className="text-orange-600">IS</span>py
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex gap-10 text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-orange-600 transition">
              Home
            </Link>
          </li>

          {/*dropdown */}
          <li className="relative group">
            <span className="cursor-pointer hover:text-orange-600 transition">
              Products ▾
            </span>

            <ul
              className="absolute left-0 mt-2 w-44 bg-white shadow-lg rounded-lg
                         opacity-0 invisible group-hover:opacity-100
                         group-hover:visible transition-all duration-200 z-50"
            >
              <li>
                <Link
                  to="/products/clothes"
                  className="block px-4 py-2 hover:bg-orange-50"
                >
                  Clothes
                </Link>
              </li>

              <li>
                <Link
                  to="/products/mobile"
                  className="block px-4 py-2 hover:bg-orange-50"
                >
                  Mobile
                </Link>
              </li>

              <li>
                <Link
                  to="/products/shoes"
                  className="block px-4 py-2 hover:bg-orange-50"
                >
                  Shoes
                </Link>
              </li>

              <li>
                <Link
                  to="/products/electronics"
                  className="block px-4 py-2 hover:bg-orange-50"
                >
                  Electronics
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/about" className="hover:text-orange-600 transition">
              About
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-6">

          {/* Search */}
          <div className="flex items-center border-2 border-orange-500 rounded-full px-4 py-2 w-72 md:w-96 shadow-sm">
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent h-10 w-full px-2 focus:outline-none text-gray-700"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white w-10 h-10 flex justify-center items-center rounded-full text-xl transition">
              <IoSearch />
            </button>
          </div>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative text-3xl text-zinc-800 hover:text-orange-600 transition"
          >
            <IoHeart />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-3xl text-zinc-800 hover:text-orange-600 transition"
          >
            <HiMiniShoppingBag />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Orders */}
          <Link
            to="/my-orders"
            className="text-3xl text-zinc-800 hover:text-orange-600 transition"
            title="My Orders"
          >
            <FaBoxOpen />
          </Link>

          {/* Auth Buttons */}
          <div className="flex gap-3 ml-4">
            <Link
              to="/login"
              className="border border-orange-500 text-orange-500 px-5 py-2 rounded-full font-medium hover:bg-orange-500 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="border border-orange-500 text-orange-500 px-5 py-2 rounded-full font-medium hover:bg-orange-500 hover:text-white transition"
            >
              Signup
            </Link>
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
