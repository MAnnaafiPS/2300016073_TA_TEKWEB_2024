import React, { useState } from "react";
import { Link } from "react-router-dom";
import feather from "feather-icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  React.useEffect(() => {
    feather.replace(); // Inisialisasi Feather icons
  }, []);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white hover:text-gray-200 transition duration-300">
            AJPA
          </Link>
        </div>

        {/* Burger Menu (Mobile) */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i data-feather="menu" className="h-6 w-6"></i>
        </button>

        {/* Navigation Menu */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex gap-8 absolute md:static top-14 left-0 w-full md:w-auto bg-indigo-600 md:bg-transparent py-4 md:py-0 md:pl-0 pl-4 transition duration-300`}
        >
          <li className="text-lg font-medium">
            <Link
              to="/"
              className="text-white hover:text-gray-200 transition duration-300 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <i data-feather="home" className="mr-2"></i> Home
            </Link>
          </li>
          <li className="text-lg font-medium">
            <Link
              to="/members"
              className="text-white hover:text-gray-200 transition duration-300 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <i data-feather="users" className="mr-2"></i> Anggota
            </Link>
          </li>
          <li className="text-lg font-medium">
            <Link
              to="/schedule"
              className="text-white hover:text-gray-200 transition duration-300 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <i data-feather="calendar" className="mr-2"></i> Jadwal
            </Link>
          </li>
          <li className="text-lg font-medium">
            <Link
              to="/about"
              className="text-white hover:text-gray-200 transition duration-300 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <i data-feather="info" className="mr-2"></i> About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
