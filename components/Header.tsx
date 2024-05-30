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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#13151a] h-24">
      <div className="mx-auto max-w-7xl px-6 flex justify-between items-center h-full">
        <div>
          <Link href="/" className="flex items-center">
            <img src="/un.png" alt="logo" className="w-20 h-20 mr-[-1.1em]" />
            <p className="text-2xl text-white transition-transform hover:translate-x-1">
              Zylo
            </p>
          </Link>
        </div>
        <div className="hidden md:flex gap-6 items-center text-white/60 md:mr-4 xl:ml-0">
          <Link
            href="/store"
            className="hover:text-white text-lg transition duration-300"
          >
            Store
          </Link>
          <Link
            href="https://discord.gg/8tcvECbDtn"
            className="hover:text-white text-lg transition duration-300"
          >
            Discord
          </Link>
          <Link
            href="/blog"
            className="hover:text-white text-lg transition duration-300"
          >
            Blog
          </Link>
          <Link
            href="/dashboard/settings"
            className="bg-blue-500 px-8 py-1 rounded text-white hover:bg-blue-600 transform transition-transform duration-300 hover:scale-105"
          >
            Login
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={handleClick} className="text-2xl mr-4">
            {isNavOpen ? "X" : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

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
        <div className="flex flex-col items-center gap-6 mt-16">
          <Link
            href="/store"
            onClick={() => setIsNavOpen(false)}
            className="text-lg font-semibold"
          >
            Store
          </Link>
          <Link
            href="https://discord.gg/8tcvECbDtn"
            onClick={() => setIsNavOpen(false)}
            className="text-lg font-semibold"
          >
            Discord
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsNavOpen(false)}
            className="text-lg font-semibold"
          >
            Blog
          </Link>
          <a
            href="/dashboard/settings"
            onClick={() => setIsNavOpen(false)}
            className="bg-[#3992f2] px-8 py-2 rounded text-white mt-4 font-semibold"
          >
            Login
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
