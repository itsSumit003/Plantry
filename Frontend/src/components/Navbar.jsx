import React from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { MdExplore, MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo-img.png";
import { useAuth } from "../context/auth-context.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { token } = useAuth();  
  const isLoggedIn = !!token;     

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#f5dbcb] py-3 px-4 shadow-sm z-50">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
        
        {/* LEFT LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center justify-between w-full md:w-auto cursor-pointer"
        >
          <div className="flex items-center">
            <img className="w-12" src={Logo} alt="logo" />
            <h1 className="text-[30px] font-extrabold text-black tracking-wide">
              Plantry
            </h1>
          </div>

          {/* MOBILE ICONS */}
          <div className="flex items-center gap-5 text-black text-xl md:hidden">
            {!isLoggedIn ? (
              <>
                <MdExplore
                  onClick={() => navigate("/store")}
                  className="cursor-pointer hover:scale-110 transition"
                  size={28}
                />
                <MdLogin
                  onClick={() => navigate("/login")}
                  className="cursor-pointer hover:scale-110 transition"
                  size={28}
                />
              </>
            ) : (
              <>
                <MdExplore
                  onClick={() => navigate("/store")}
                  className="cursor-pointer hover:scale-110 transition"
                  size={28}
                />
                <FaHeart
                  onClick={() => navigate("/wishlist")}
                  className="cursor-pointer hover:scale-110 transition"
                  size={24}
                />
                <FaShoppingCart
                  onClick={() => navigate("/cart")}
                  className="cursor-pointer hover:scale-110 transition"
                  size={24}
                />
                <FaUser
                  onClick={() => navigate("/userprofile")}
                  className="cursor-pointer hover:scale-110 transition"
                  size={24}
                />
              </>
            )}
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="flex items-center w-full md:w-[45%] border rounded-lg px-3 py-2 bg-transparent mt-3 md:mt-0">
          <FaSearch className="text-black opacity-70 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none text-gray-700 bg-transparent placeholder-gray-500"
          />
        </div>

        {/* DESKTOP ICONS */}
        <div className="hidden md:flex items-center gap-2 text-black text-xl">
          {!isLoggedIn ? (
            <>
              <div
                onClick={() => navigate("/store")}
                className="p-2 rounded-full cursor-pointer hover:bg-[#149253]/30 hover:scale-110 transition"
              >
                <MdExplore size={28} />
              </div>

              <div
                onClick={() => navigate("/login")}
                className="p-2 rounded-full cursor-pointer hover:bg-[#149253]/30 hover:scale-110 transition"
              >
                <MdLogin size={28} />
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => navigate("/store")}
                className="p-2 rounded-full cursor-pointer hover:bg-[#149253]/30 hover:scale-110 transition"
              >
                <MdExplore size={28} />
              </div>

              <div
                onClick={() => navigate("/wishlist")}
                className="p-2 rounded-full cursor-pointer hover:bg-[#149253]/30 hover:scale-110 transition"
              >
                <FaHeart size={24} />
              </div>

              <div
                onClick={() => navigate("/cart")}
                className="p-2 rounded-full cursor-pointer hover:bg-[#149253]/30 hover:scale-110 transition"
              >
                <FaShoppingCart size={24} />
              </div>

              <div
                onClick={() => navigate("/userprofile")}
                className="p-2 rounded-full cursor-pointer hover:bg-[#149253]/30 hover:scale-110 transition"
              >
                <FaUser size={24} />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
