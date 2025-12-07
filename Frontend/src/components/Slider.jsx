import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import HomePage2 from "../assets/images/home-banner.webp";
import Banner from "../assets/images/home-page-banner.webp";
import HomePage from "../assets/images/nurserylive-home-page.webp";

const Slider = () => {
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
        <SwiperSlide>
          <img
            src={Banner}
            alt="Banner"
            className="w-full min-h-[240px] md:min-h-[400px] object-contain rounded-2xl"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={HomePage2}
            alt="Banner"
            className="w-full min-h-[220px] md:min-h-[400px] object-contain rounded-2xl"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={HomePage}
            alt="Home Page"
            className="w-full min-h-[220px] md:min-h-[400px] object-contain rounded-2xl"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
