"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { GiUpgrade } from "react-icons/gi";
import { CiSettings } from "react-icons/ci";
import { IoIosStats } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";

const Nav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard/appearance", icon: FaUserEdit, label: "Appearance" },
    { href: "/dashboard/stats", icon: IoIosStats, label: "Stats" },
    { href: "/dashboard/settings", icon: CiSettings, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0b0c0f] shadow-lg flex justify-around text-white py-3">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex flex-col items-center transition-colors ${
              pathname === item.href
                ? "text-blue-600"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <item.icon className="mb-1" size={24} />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
        <Link
          href="/upgrade"
          className="flex flex-col items-center text-gray-300 hover:text-white transition-colors"
        >
          <GiUpgrade className="mb-1" size={24} />
          <span className="text-xs">Upgrade</span>
        </Link>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed left-4 top-4 lg:w-56 xl:w-72 2xl:w-72 h-[calc(100vh-2rem)] bg-[#0b0c0f] rounded-xl shadow-lg flex-col text-white p-4">
        <div className="mt-5">
          <div className="text-center mb-8 text-2xl font-bold">
            <a href="/">Zylo</a>
          </div>
          <div className="flex flex-col space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center px-4 py-2 text-gray-300 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "hover:bg-white/15"
                }`}
              >
                <item.icon />
                <span className="ml-4">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <Link
            href="/upgrade"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-white/15 rounded-lg transition-colors"
          >
            <GiUpgrade />
            <span className="ml-4">Upgrade</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Nav;
