import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full bg-white shadow-md fixed top-0 z-50">

      {/* Top Section */}
      <div className="flex items-center justify-between px-8 py-2 bg-orange-50">

        <img
          className="h-14 w-14 rounded-full object-cover"
          src="https://i.pinimg.com/236x/47/8d/91/478d91cfdd23742558b17ee10fdd1415.jpg"
          alt="background"
        />

        <div className="flex items-center gap-3">
          <Link to="home" smooth={true} duration={500} offset={-80} onClick={scrollToTop}>
            <img
              src={logo}
              className="w-[60px] h-[60px] rounded-full cursor-pointer shadow-md hover:scale-105 transition"
              alt="logo"
            />
          </Link>

          <h4 className="text-2xl font-bold text-orange-600">
            DarshanEase
          </h4>
        </div>

        <img
          className="h-14 w-14 rounded-full object-cover"
          src="https://i.pinimg.com/236x/60/ea/85/60ea85960135aadd5ba6e97220241fb5.jpg"
          alt="background"
        />

      </div>

      {/* Navigation */}
      <nav className="flex justify-center items-center gap-10 py-3 bg-white text-gray-700 font-medium">

        <Link to="home" smooth={true} duration={500} offset={-80} onClick={scrollToTop} className="cursor-pointer hover:text-orange-500 transition">
          Home
        </Link>

        <Link to="temples" smooth={true} duration={500} offset={-120} className="cursor-pointer hover:text-orange-500 transition">
          Temples
        </Link>

        <Link to="about" smooth={true} duration={500} offset={-140} className="cursor-pointer hover:text-orange-500 transition">
          About
        </Link>

        <Link to="services" smooth={true} duration={500} offset={-140} className="cursor-pointer hover:text-orange-500 transition">
          Services
        </Link>

        <Link to="contact" smooth={true} duration={500} offset={-100} className="cursor-pointer hover:text-orange-500 transition">
          Contact Us
        </Link>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg shadow transition"
          >
            Login
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg flex flex-col">
              <RouterLink to="/ulogin" className="px-4 py-2 hover:bg-gray-100">
                User
              </RouterLink>
              <RouterLink to="/ologin" className="px-4 py-2 hover:bg-gray-100">
                Organizer
              </RouterLink>
              <RouterLink to="/alogin" className="px-4 py-2 hover:bg-gray-100">
                Admin
              </RouterLink>
            </div>
          )}
        </div>

      </nav>
    </div>
  );
};

export default NavBar;