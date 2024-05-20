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
    <nav className="fixed left-3 top-5 w-60 h-[95vh] bg-[#0b0c0f] rounded-lg shadow-lg flex flex-col text-white">
      <div className="mt-5 mb-5">
        <div className="text-center mb-8 text-2xl font-bold">BioBoost</div>
        <div className="flex flex-col space-y-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded transition-colors ${
                pathname === item.href ? "bg-blue-600" : ""
              }`}
            >
              <item.icon />
              <span className="ml-4">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto mb-5">
        <Link
          href="/"
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded transition-colors"
        >
          <GiUpgrade />
          <span className="ml-4">Upgrade</span>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
