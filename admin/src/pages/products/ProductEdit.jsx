import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { ENDPOINTS } from "../../api/endpoints";
import { getCategories } from "../../api/categoryApi";
import Loader from "../../components/common/Loader";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          axiosClient.get(`${ENDPOINTS.PRODUCTS}/${id}`),
          getCategories(),
        ]);
        const product = prodRes.data.data || prodRes.data.product || prodRes.data;
        setForm({
          title: product.title || "",
          description: product.description || "",
          price: product.price || "",
          sale_price: product.sale_price || "",
          stock: product.stock || "",
          category_id: product.category_id || (product.category?.id) || "",
        });
        setCategories(catRes.data.data || catRes.data.categories || []);
      } catch (err) {
        console.error("Load product error:", err);
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFiles(Array.from(e.target.files));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      files.forEach((f) => fd.append("images", f));
      const res = await axiosClient.put(`${ENDPOINTS.PRODUCTS}/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) navigate("/products");
      else alert(res.data.message || "Failed to update product");
    } catch (err) {
      console.error("Update product error:", err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !form) return <Loader />;

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

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
          <label className="block text-sm mb-1 font-medium">Replace / Add Images (optional)</label>
          <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full" />
          {files.length > 0 && <p className="text-xs text-gray-500 mt-1">{files.length} file(s) selected</p>}
        </div>

        <button disabled={submitting} className="px-4 py-2 bg-gray-900 text-white rounded">
          {submitting ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
