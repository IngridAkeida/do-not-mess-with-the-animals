'use client';

import Image from "next/image";
import { useState } from "react";

const Nav = () => { 
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='flex justify-between items-center h-24 bg-blue-800 px-10 gap-6'>
      <div>
        <Image src="/assets/logo2SemFundo.png" alt="Logo" width={70} height={40} style={{objectFit: "contain"}}/>
      </div>
      <div className="md:hidden" onClick={toggleMenu}>
        <div className="space-y-2 cursor-pointer">
          <div className="w-8 h-1 bg-white"></div>
          <div className="w-8 h-1 bg-white"></div>
          <div className="w-8 h-1 bg-white"></div>
        </div>
      </div>
      <div className={`flex-col md:flex md:flex-row md:items-center ${isOpen ? "flex" : "hidden"} md:gap-6`}>
        <ul className='flex flex-col md:flex-row md:gap-6'>
          <li><a href="/">Movies</a></li>
          <li><a href="/">TV Shows</a></li>
          <li><a href="/">People</a></li>
        </ul>
        <ul className='flex flex-col md:flex-row md:gap-6'>
          <li><a href="/">Language</a></li>
          <li><a href="/">Search</a></li>
          <li><a href="/">Account</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
