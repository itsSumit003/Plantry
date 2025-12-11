import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";   // ⬅ Add this

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // ⬅ Add navigate hook

  const fetchBanners = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/banners");

      if (res.data.success) {
        setBanners(res.data.data);
      }
    } catch (error) {
      console.error("Banner fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="w-full mt-[95px] md:mt-20 px-1.5 md:px-2.5">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="rounded-2xl"
      >
        {/* Loading State */}
        {loading ? (
          <SwiperSlide>
            <div className="w-full min-h-[240px] md:min-h-[400px] flex items-center justify-center bg-gray-200 rounded-2xl">
              Loading banners...
            </div>
          </SwiperSlide>
        ) : banners.length > 0 ? (
          banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <img
                src={`http://localhost:3000${banner.image}`}
                alt={banner.title}
                onClick={() => navigate("/store")}    
                className="w-full min-h-[240px] md:min-h-[400px] object-contain rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="w-full min-h-[240px] md:min-h-[400px] flex items-center justify-center bg-gray-200 rounded-2xl">
              No banners found
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default Slider;
