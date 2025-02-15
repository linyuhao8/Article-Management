"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-gray-800">
              MyLogo
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <a href="/" className="text-gray-800 hover:text-blue-500 px-3 py-2">
              Home
            </a>
            <a
              href="/about"
              className="text-gray-800 hover:text-blue-500 px-3 py-2"
            >
              About
            </a>
            <a
              href="/services"
              className="text-gray-800 hover:text-blue-500 px-3 py-2"
            >
              Services
            </a>
            <a
              href="/contact"
              className="text-gray-800 hover:text-blue-500 px-3 py-2"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-blue-500 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="/"
                className="block text-gray-800 hover:text-blue-500 px-3 py-2"
              >
                Home
              </a>
              <a
                href="/about"
                className="block text-gray-800 hover:text-blue-500 px-3 py-2"
              >
                About
              </a>
              <a
                href="/services"
                className="block text-gray-800 hover:text-blue-500 px-3 py-2"
              >
                Services
              </a>
              <a
                href="/contact"
                className="block text-gray-800 hover:text-blue-500 px-3 py-2"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
