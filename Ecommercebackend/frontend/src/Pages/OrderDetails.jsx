import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/orders/${id}/`)
      .then(res => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">
        Order #{order.id}
      </h2>

      <p><b>Status:</b> {order.status}</p>
      <p><b>Total:</b> ₹{order.total_price}</p>

      <h3 className="mt-6 font-semibold">Products</h3>

      <div className="mt-2 space-y-2">
        {order.items.map(item => (
          <div
            key={item.id}
            className="border p-3 rounded"
          >
            <p><b>Product:</b> {item.product.name}</p>
            <p><b>Price:</b> ₹{item.product.price}</p>
            <p><b>Quantity:</b> {item.quantity}</p>
            <p><b>Subtotal:</b> ₹{item.product.price * item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
