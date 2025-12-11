import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";   

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); 

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories");
      setCategories(res.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <h2 className="text-center mt-10">Loading Categories...</h2>;
  }

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

      {/* Category List */}
      <div className="flex flex-col items-center md:gap-15 gap-10">

        {/* First 4 items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-20 gap-10 justify-items-center">
          {categories.slice(0, 4).map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <img
                src={`http://localhost:3000/uploads/categories/${item.image}`}
                alt={item.name}
                onClick={() => navigate("/store")}  
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 object-cover rounded-full aspect-square shadow-xl cursor-pointer hover:scale-110 transition-transform duration-300"
              />
              <p className="mt-4 text-lg font-medium">{item.name}</p>
            </div>
          ))}
        </div>

        {/* Last 3 items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:gap-20 gap-10 justify-center">
          {categories.slice(4).map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <img
                src={`http://localhost:3000/uploads/categories/${item.image}`}
                alt={item.name}
                onClick={() => navigate("/store")}   
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 object-cover rounded-full aspect-square shadow-xl cursor-pointer hover:scale-110 transition-transform duration-300"
              />
              <p className="mt-4 text-lg font-medium">{item.name}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Categories;
