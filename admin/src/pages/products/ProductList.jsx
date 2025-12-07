import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { ENDPOINTS } from "../../api/endpoints";
import Table from "../../components/common/Table";
import Loader from "../../components/common/Loader";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get(ENDPOINTS.PRODUCTS);
      // backend may return { data: products } or { products: [...] }
      setProducts(res.data.data || res.data.products || []);
    } catch (err) {
      console.error("Fetch products error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axiosClient.delete(`${ENDPOINTS.PRODUCTS}/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete product error:", err);
      alert("Failed to delete product");
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Products</h2>
        <div className="flex gap-2">
          <Link to="/products/new" className="px-4 py-2 rounded bg-gray-900 text-white text-sm">
            + Add Product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <Table headers={["ID", "Title", "Price", "Category", "Stock", "Actions"]}>
          {products.map((p) => (
            <tr key={p.id} className="border-b last:border-none">
              <td className="py-2">{p.id}</td>
              <td className="py-2">{p.title}</td>
              <td className="py-2">₹{p.price}</td>
              <td className="py-2">{p.Category?.name || p.category?.name || p.category_id}</td>
              <td className="py-2">{p.stock}</td>
              <td className="py-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/products/edit/${p.id}`)}
                    className="px-2 py-1 text-sm bg-blue-600 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-2 py-1 text-sm bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>

        {products.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">No products found.</p>
        )}
      </div>
    </div>
  );
}
