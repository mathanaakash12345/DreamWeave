import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <>
    <hr  />
    <header className="bg-white text-black py-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-row items-center">
          {/* <img src={logo} alt="DreamWeave Logo" className="w-[100px] h-[100px]" /> */}
          <div className="text-3xl font-sans py-4">
            <Link to="/" className="hover:text-yellow-400 inline-flex gap-0">
             <span className='font-sans '>Dream</span> <span className='font-inter font-bold'>Weave</span> 
            </Link>
          </div>
        </div>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-yellow-400 font-sans text-xl">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-400 font-sans text-xl">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-400 font-sans text-xl">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <hr />
    </header>
    </>
  );
}
