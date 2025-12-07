import React from "react";
import { FaStar } from "react-icons/fa";

const ProductFilters = () => {
  return (
    <aside className="w-64 h-screen overflow-y-auto bg-white p-5 border-r border-gray-200 hidden md:block">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">Filters</h2>
        <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
          CLEAR
        </button>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h3 className="font-semibold mb-1">Rating</h3>

        <div className="flex justify-between items-center text-sm font-medium">
          <span className="flex items-center gap-1">
            1 <FaStar className="text-yellow-500" />
          </span>
          <span className="flex items-center gap-1">
            5 <FaStar className="text-yellow-500" />
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="5"
          className="w-full mt-2 accent-green-600"
        />
      </div>

      <hr />

      {/* Categories */}
      <div className="my-6">
        <h3 className="font-semibold mb-2">Categories</h3>

        {[
          "For TableTop",
          "Flowers",
          "Indoor",
          "Medicinal",
          "Fruits",
          "Outdoor",
          "Climbers",
        ].map((item) => (
          <label key={item} className="flex items-center gap-2 py-1">
            <input type="checkbox" className="accent-green-600" /> {item}
          </label>
        ))}
      </div>

      <hr />

      {/* Size */}
      <div className="my-6">
        <h3 className="font-semibold mb-2">Size</h3>

        {["Small", "Medium"].map((size) => (
          <label key={size} className="flex items-center gap-2 py-1">
            <input type="checkbox" className="accent-green-600" /> {size}
          </label>
        ))}
      </div>

      <hr />

      {/* Availability */}
      <div className="my-6">
        <h3 className="font-semibold mb-2">Availability</h3>

        {[
          "Include out of Stock",
          "Fast Delivery Only",
          "On Sale",
        ].map((item) => (
          <label key={item} className="flex items-center gap-2 py-1">
            <input type="checkbox" className="accent-green-600" /> {item}
          </label>
        ))}
      </div>
    </aside>
  );
};

export default ProductFilters;
