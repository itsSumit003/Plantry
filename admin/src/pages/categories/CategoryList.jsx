import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../api/categoryApi";
import axiosClient from "../../api/axiosClient";
import { ENDPOINTS } from "../../api/endpoints";
import Table from "../../components/common/Table";
import Loader from "../../components/common/Loader";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCats = async () => {
    try {
      setLoading(true);
      const res = await getCategories();
      setCategories(res.data.data || res.data.categories || []);
    } catch (err) {
      console.error("Load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete category?")) return;
    try {
      await axiosClient.delete(`${ENDPOINTS.CATEGORIES}/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Delete category error:", err);
      alert("Failed to delete");
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Categories</h2>
        <Link to="/categories/new" className="px-4 py-2 rounded bg-gray-900 text-white text-sm">
          + Add Category
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <Table headers={["ID", "Name", "Slug", "Actions"]}>
          {categories.map((c) => (
            <tr key={c.id} className="border-b">
              <td className="py-2">{c.id}</td>
              <td className="py-2">{c.name}</td>
              <td className="py-2 text-xs text-gray-500">{c.slug}</td>
              <td className="py-2">
                <div className="flex gap-2">
                  <Link to={`/categories/edit/${c.id}`} className="px-2 py-1 bg-blue-600 text-white rounded text-sm">Edit</Link>
                  <button onClick={() => handleDelete(c.id)} className="px-2 py-1 bg-red-600 text-white rounded text-sm">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </Table>

        {categories.length === 0 && <p className="text-sm text-gray-500 mt-2">No categories found.</p>}
      </div>
    </div>
  );
}
