"use client";

import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header>
      <nav className="flex justify-between mt-4 font-semibold items-center">
        <div className="md:ml-4 xl:ml-0">
          <Link href="/" className="flex items-center ml-4 md:ml-0">
            <img src="/link.png" alt="logo" className="w-9 h-9 mr-1" />
            <p className="text-2xl">BioBoost</p>
          </Link>
        </div>
        <div className="hidden md:flex gap-6 items-center text-white/60 md:mr-4 xl:ml-0">
          <Link href="/">Features</Link>
          <Link href="/">Store</Link>
          <Link href="/">Pricing</Link>
          <Link href="/">Blog</Link>
          <button className="bg-blue-500 px-8 py-1 rounded text-white">
            Login
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={handleClick} className="text-2xl mr-4">
            {isNavOpen ? "" : <GiHamburgerMenu />}
          </button>
        </div>
      </nav>

      {/* Backdrop Overlay */}
      <div
        className={`${
          isNavOpen ? "fixed" : "hidden"
        } inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out md:hidden`}
        onClick={handleClick}
      ></div>

      {/* Mobile Navigation Menu */}
      <div
        className={`${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 h-full w-2/3 bg-[#13151a]  text-white shadow-lg p-8 transform transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col items-center gap-6 mt-10">
          <Link
            href="/"
            onClick={() => setIsNavOpen(false)}
            className="text-lg font-semibold"
          >
            Features
          </Link>
          <Link
            href="/"
            onClick={() => setIsNavOpen(false)}
            className="text-lg font-semibold"
          >
            Store
          </Link>
          <Link
            href="/"
            onClick={() => setIsNavOpen(false)}
            className="text-lg font-semibold"
          >
            Pricing
          </Link>
          <Link
            href="/"
            onClick={() => setIsNavOpen(false)}
            className="text-lg font-semibold"
          >
            Blog
          </Link>
          <button
            onClick={() => setIsNavOpen(false)}
            className="bg-[#3992f2] px-8 py-2 rounded text-white mt-4 font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
