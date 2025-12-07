import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBanners } from "../../api/bannerApi";
import Loader from "../../components/common/Loader";

export default function BannerList() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await getBanners();
      setBanners(res.data.data || res.data.banners || []);
    } catch (err) {
      console.error("Load banners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Banners</h2>
        <Link to="/banners/new" className="px-4 py-2 rounded bg-gray-900 text-white text-sm">
          + Upload Banner
        </Link>
      </div>

      {loading ? <Loader /> : (
        <div className="grid md:grid-cols-3 gap-4">
          {banners.map((b) => (
            <div key={b.id} className="bg-white rounded-xl shadow overflow-hidden">
              {b.image && (
                <img src={`http://localhost:5000/uploads/${b.image}`} alt={b.title}
                  className="w-full h-40 object-cover" />
              )}
              <div className="p-3">
                <h3 className="font-semibold text-sm">{b.title}</h3>
                <p className="text-xs text-gray-500 mt-1">Status: {b.status ? "Active" : "Inactive"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && banners.length === 0 && <p className="text-sm text-gray-500 mt-2">No banners uploaded yet.</p>}
    </div>
  );
}
