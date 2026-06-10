import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-full transition duration-300 ${isActive
      ? "bg-white text-[#0B4AA2] font-bold"
      : "hover:bg-white hover:text-[#0B4AA2]"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0B4AA2] to-[#2FA31A] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Vidarbha Online Center"
            className="h-14 w-14 rounded-full border-2 border-green-300"
          />

          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
              विदर्भ ऑनलाइन सेंटर
            </h1>
            <p className="text-xs text-green-100">
              Digital & Government Services
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 font-semibold">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>
          </li>

          <li>
            <NavLink to="/tools" className={navLinkClass}>
              Tools
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/downloads"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Download
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </li>

          

          {/* <li>
            <button className="bg-white text-[#0B4AA2] px-4 py-2 rounded-full font-semibold hover:bg-green-100 transition">
              Login
            </button>
          </li> */}
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0B4AA2] border-t border-green-400">
          <ul className="flex flex-col p-4 gap-3 font-semibold">
            <li>
              <NavLink
                to="/"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/services"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Services
              </NavLink>
            </li>


            <li>
              <NavLink to="/tools" className={navLinkClass}>
                Tools
              </NavLink>
            </li> 

            
            <li>
              <NavLink
                to="/downloads"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Download
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                About
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </NavLink>
            </li>

            {/* <li>
              <button className="w-full bg-white text-[#0B4AA2] py-2 rounded-full font-semibold">
                Login
              </button>
            </li> */}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;