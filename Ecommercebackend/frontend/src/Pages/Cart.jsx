import { useContext, useEffect } from "react";
import { CartContext } from "../Context/CartContext";

export default function Cart() {
  const { cart, fetchCart, removeFromCart, updateQty } = useContext(CartContext);

  useEffect(() => {
    fetchCart();
  }, []);

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    return <h1 className="text-center mt-10 text-xl">Your cart is empty </h1>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center border p-4 rounded-lg">
            <div className="flex gap-6">
              <img src={item.product.image} alt={item.product.name} className="w-28 h-28 object-cover rounded" />
              <div>
                <h2 className="text-xl font-semibold">{item.product.name}</h2>
                <p className="text-gray-600">
                  Color: {item.selected_color} | Size: {item.selected_size}
                </p>
                <p className="mt-2 font-semibold">₹{item.product.price}</p>

                {/* Quantity Buttons */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => {
                      const newQty = parseInt(item.quantity) - 1;
                      if (newQty >= 1) updateQty(item.id,item.product.id, newQty);
                    }}
                    disabled={item.quantity <= 1}
                    className="px-3 py-1 border rounded hover:bg-gray-200"
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQty(item.id,item.product.id, parseInt(item.quantity) + 1)}
                    className="px-3 py-1 border rounded hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-lg">₹{item.product.price * item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-8 border-t pt-6">
        <h2 className="text-2xl font-bold">Total: ₹{totalAmount}</h2>
        <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
