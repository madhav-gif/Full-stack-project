import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function CategoryProducts() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const PAGE_SIZE = 8; // backend pagination ke hisab se

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/products/?category=${category}&page=${page}`)
      .then((res) => {
        setProducts(res.data.results);
        setCount(res.data.count);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [category, page]);

  const totalPages = Math.ceil(count / PAGE_SIZE);

  if (loading) {
    return <p className="p-8">Loading products...</p>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        {category} Products
      </h2>

      {products.length === 0 && (
        <p>No products found in this category.</p>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600 mt-1">₹{product.price}</p>

            <button
              className="mt-3 bg-orange-500 hover:bg-orange-600
                         text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
