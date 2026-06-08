import React, { Component } from 'react';
import logo from '../logo.png';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className="px-2 py-3 bg-gradient-to-r from-[#0B4AA2] to-[#2FA31A] text-white shadow-md shadow flex justify-between ">
        <div className="flex items-center w-[50%]">
          <img src={logo} alt="Logo" className="h-14 w-auto rounded-full border-2 border-green-300" />
          <h1 className='text-3xl px-4 bold'>विदर्भ ऑनलाइन सेंटर</h1>
        </div>
        <div className="flex items-center w-[50%] start-end">
          <ul className="flex gap-6 text-white bold justify-centerx">
            <li>
              <Link to="/" className="hover:text-green-600">
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" className=" hover:text-green-600">
                About
              </Link>
            </li>

            <li>
              <Link to="/contact" className=" hover:text-green-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;