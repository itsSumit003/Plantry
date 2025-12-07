import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { ENDPOINTS } from "../../api/endpoints";
import { getCategories } from "../../api/categoryApi";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";

export default function ProductForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    sale_price: "",
    stock: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCats() {
      try {
        const res = await getCategories();
        setCategories(res.data.data || res.data.categories || []);
      } catch (err) {
        console.error("Load categories:", err);
      }
    }
    loadCats();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setFiles(Array.from(e.target.files));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      files.forEach((f) => fd.append("images", f));
      const res = await axiosClient.post(ENDPOINTS.CREATE_PRODUCT, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        navigate("/products");
      } else {
        alert(res.data.message || "Failed to create product");
      }
    } catch (err) {
      console.error("Create product error:", err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-xl shadow">
        <div>
          <label className="block text-sm mb-1 font-medium">Title</label>
          <input name="title" required value={form.title} onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Category</label>
          <select name="category_id" required value={form.category_id} onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm">
            <option value="">Select category</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 font-medium">Price</label>
            <input type="number" name="price" required value={form.price} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Sale Price</label>
            <input type="number" name="sale_price" value={form.sale_price} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Stock</label>
            <input type="number" name="stock" required value={form.stock} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Description</label>
          <textarea name="description" rows="4" value={form.description} onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Product Images (max 5)</label>
          <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full" />
          {files.length > 0 && <p className="text-xs text-gray-500 mt-1">{files.length} file(s) selected</p>}
        </div>

        <button disabled={submitting} className="px-4 py-2 bg-gray-900 text-white rounded">
          {submitting ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}
