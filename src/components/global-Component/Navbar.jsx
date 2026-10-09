import React, { useState } from "react";
import { Menu, X, Minimize2 } from "lucide-react";
import { navlist } from "./const/constDataNavbar";
import { LiaCompressArrowsAltSolid } from "react-icons/lia";
export default function Navbar() {
  const [toggleMobile, setToggleMobile] = useState(false);
  
  const handleMenu = () => {
    setToggleMobile(!toggleMobile);
  };
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
        <a href="#home" className="flex items-center gap-2">
          <LiaCompressArrowsAltSolid size={32} className="text-green-500" />
          <h1 className="text-2xl md:text-3xl font-bold text-green-500 uppercase ml-[-11px]">Nexcent</h1>
        </a>
        </div>
        <div className="hidden md:block">
          <ul className="flex space-x-8">
            {navlist.map((item) => (
              <li key={item.link}>
                <a 
                  href={item.href} 
                  className="text-gray-600 hover:text-green-500 font-medium transition-colors"
                >
                  {item.link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <a href="#faq" className="text-gray-600 hover:text-green-500 cursor-pointer">FAQ</a>
          <a href="#login" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors font-medium">
            Login
          </a>
        </div>
        <div className="md:hidden">
          <button 
            onClick={handleMenu} 
            className="text-green-500 focus:outline-none"
          >
            {toggleMobile ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {toggleMobile && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-inner">
          <ul className="flex flex-col space-y-4 items-center">
            {navlist.map((item) => (
              <li key={item.link} className="w-full text-center py-2">
                <a 
                  href={item.href} 
                  className="text-gray-600 hover:text-green-500 font-medium block w-full"
                  onClick={() => setToggleMobile(false)}
                >
                  {item.link}
                </a>
              </li>
            ))}
            <li className="pt-4 w-full">
              <a 
                href="#login" 
                className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors font-medium block text-center w-full"
                onClick={() => setToggleMobile(false)}
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}