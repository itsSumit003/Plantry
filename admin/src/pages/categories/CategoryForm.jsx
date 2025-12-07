import React, { useState } from "react";
import { createCategory } from "../../api/categoryApi";
import { useNavigate } from "react-router-dom";

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await createCategory({ name });
      if (res.data.success) navigate("/categories");
      else alert(res.data.message || "Failed to create category");
    } catch (err) {
      console.error("Create category error:", err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-bold mb-4">Add Category</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm mb-1 font-medium">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required
            className="w-full border rounded-lg px-3 py-2 text-sm" />
        </div>

        <button disabled={saving} className="px-4 py-2 bg-gray-900 text-white rounded">
          {saving ? "Saving..." : "Save Category"}
        </button>
      </form>
    </div>
  );
}
