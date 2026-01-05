import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/orders/")
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-8">Loading orders...</p>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 && (
        <p>No orders found</p>
      )}

      {orders.map(order => (
        <div key={order.id} className="border p-4 mb-4 rounded shadow">
          <p><b>Order ID:</b> {order.id}</p>
          <p><b>Total:</b> ₹{order.total_price}</p>
          <p><b>Status:</b> {order.status}</p>

          <Link
            to={`/order/${order.id}`}
            className="text-orange-500 mt-2 inline-block"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
