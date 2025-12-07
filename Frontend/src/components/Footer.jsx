import React from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#1b4b33] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-5">
        {/* LEFT SECTION */}
        <div>
          <h1 className="text-3xl font-extrabold mb-3">Plantry</h1>
          <p className="mb-6 text-gray-200 md:text-[17px] text-[14px]">
            Fill your house and workplace with pleasant and beautiful plants.
          </p>
          {/* Social Icons */}
          <div className="flex gap-5 text-2xl">
            <a href="#" className="hover:text-gray-300 transition">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h2 className="text-[15px] font-semibold mb-4 md:text-xl">
            Quick Links
          </h2>

          <ul className="flex flex-row md:flex-col gap-4 md:gap-2 text-gray-200">
            <li className="hover:text-[#149253] cursor-pointer transition">
              Products
            </li>
            <li className="hover:text-[#149253] cursor-pointer transition">
              Wishlist
            </li>
            <li className="hover:text-[#149253] cursor-pointer transition">Cart</li>
          </ul>
        </div>

        {/* CONTACT SECTION */}
        <div>
          <h2 className="text-[15px] font-semibold mb-4 md:text-xl">
            Contact Us
          </h2>
          <p className="flex items-center gap-3 mb-3 text-gray-200">
            <MdLocationOn size={22} /> 201 Oakbrook Center, Indiana
          </p>
          <p className="flex items-center gap-3 mb-3 text-gray-200">
            <FaPhoneAlt size={20} /> +91 23453 98765
          </p>
          <p className="flex items-center gap-3 text-gray-200">
            <IoMdMail size={22} /> support@plantique.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
