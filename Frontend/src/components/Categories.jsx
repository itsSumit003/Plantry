import React from "react";

import Fruits from "../assets/images/fruits.avif";
import Climbers from "../assets/images/climbers.webp";
import Flowers from "../assets/images/flower.webp";
import Indoor from "../assets/images/indoor.avif";
import Outdoor from "../assets/images/outdoor.webp";
import Table from "../assets/images/table.avif";
import Medicinal from "../assets/images/medicinal.webp";

const data = [
  { img: Flowers, title: "Flowers" },
  { img: Indoor, title: "Indoor" },
  { img: Outdoor, title: "Outdoor" },
  { img: Table, title: "For TableTop" },
  { img: Medicinal, title: "Medicinal" },
  { img: Climbers, title: "Climbers" },
  { img: Fruits, title: "Fruits" },
];

const Categories = () => {
  return (
    <div className="py-0 px-5 md:px-20 md:py-12 text-center">
      {/* Heading */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-[#0d2f1b]">
          Embrace the Green Oasis of Plantry
        </h1>

        <p className="mt-4 text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Plants are a great addition to our homes and life for both their
          physical and psychological benefits. Explore Plantry curated list of
          green and lovely plants.
        </p>
      </div>

      {/* Category */}
      <div className="flex flex-col items-center  md:gap-15 gap-10">
        {/*first 4 items in grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-20 gap-10 justify-items-center ">
          {data.slice(0, 4).map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={item.img}
                alt={item.title}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 object-cover rounded-full aspect-square shadow-xl cursor-pointer hover:scale-110 transition-transform duration-300"
              />
              <p className="mt-4 text-lg font-medium">{item.title}</p>
            </div>
          ))}
        </div>

        {/* 3 items centered */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:gap-20 gap-10 justify-center">
          {data.slice(4).map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={item.img}
                alt={item.title}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 object-cover rounded-full aspect-square shadow-xl cursor-pointer hover:scale-110 transition-transform duration-300"
              />
              <p className="mt-4 text-lg font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Categories
