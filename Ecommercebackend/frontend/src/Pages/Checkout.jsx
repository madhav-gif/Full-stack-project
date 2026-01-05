import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { CartContext } from "../Context/CartContext";


export default function Checkout() {
const { cart, clearCart } = useContext(CartContext);
const [address, setAddress] = useState("");
const navigate = useNavigate();


const totalAmount = cart.reduce(
(sum, item) => sum + item.price * item.quantity,
0
);


const placeOrder = async () => {
try {
await axiosInstance.post("/orders/", {
carts: cart.map(item => item.id),
address: address,
total_amount: totalAmount,
});


clearCart();
navigate("/order-success");
} catch (err) {
alert("Order failed");
}
};


return (
<div className="p-8">
<h2 className="text-2xl font-bold mb-4">Checkout</h2>


<textarea
className="border w-full p-3 mb-4"
placeholder="Enter delivery address"
value={address}
onChange={(e) => setAddress(e.target.value)}
/>


<h3 className="text-xl mb-4">Total: ₹{totalAmount}</h3>


<button
onClick={placeOrder}
className="bg-orange-500 text-white px-6 py-2 rounded"
>
Place Order
</button>
</div>
);
}