import React, { useState } from "react";
import { createBanner } from "../../api/bannerApi";
import { useNavigate } from "react-router-dom";

export default function BannerForm() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { alert("Please select an image"); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("image", file);
      const res = await createBanner(fd);
      if (res.data.success) navigate("/banners");
      else alert(res.data.message || "Failed to upload banner");
    } catch (err) {
      console.error("Upload banner error:", err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-bold mb-4">Upload Banner</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm mb-1 font-medium">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required
            className="w-full border rounded-lg px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Image</label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <button disabled={saving} className="px-4 py-2 bg-gray-900 text-white rounded">
          {saving ? "Uploading..." : "Upload Banner"}
        </button>
      </form>
    </div>
  );
}
