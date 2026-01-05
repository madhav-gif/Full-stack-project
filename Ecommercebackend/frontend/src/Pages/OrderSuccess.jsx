import { Link } from "react-router-dom";


export default function OrderSuccess() {
return (
<div className="flex flex-col items-center justify-center h-[70vh]">
<h1 className="text-3xl font-bold text-green-600">Order Placed!</h1>
<p className="mt-3">Thank you for shopping with us.</p>


<Link
to="/my-orders"
className="mt-6 bg-orange-500 text-white px-6 py-2 rounded"
>
View My Orders
</Link>
</div>
);
}