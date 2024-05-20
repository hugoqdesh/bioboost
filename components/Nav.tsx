import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="fixed left-3 top-5 w-60 h-[95vh] bg-black rounded-lg">
      <div className="mt-5 text-center">
        <Link href="/dashboard/links" className="text-3xl">
          BioBoost
        </Link>
      </div>

      <div className="flex flex-col mt-10 text-lg items-center gap-1">
        <Link
          href="/dashboard/links"
          className="hover:text-blue-500 hover:bg-[#13151a] transition duration-300 rounded cursor-pointer py-2 px-[37%]"
        >
          Links
        </Link>

        <Link
          href="/dashboard/appearance"
          className="hover:text-blue-500 hover:bg-[#13151a] transition duration-300 rounded cursor-pointer py-2 px-[24%]"
        >
          Appearance
        </Link>

        <Link
          href="/dashboard/stats"
          className="hover:text-blue-500 hover:bg-[#13151a] transition duration-300 rounded cursor-pointer py-2 px-[37%]"
        >
          Stats
        </Link>

        <Link
          href="/dashboard/settings"
          className="hover:text-blue-500 hover:bg-[#13151a] transition duration-300 rounded cursor-pointer py-2 px-[30%]"
        >
          Settings
        </Link>
      </div>

      <div className="flex flex-col text-lg mt-[53vh] items-center gap-1">
        <Link
          href="/"
          className="text-black bg-[#ffffff9c] hover:bg-[#ffffff] transition duration-300 rounded cursor-pointer py-2 px-[30%]"
        >
          Upgrade
        </Link>
        <Link
          href="/"
          className="text-red-500/50 hover:text-red-500 transition duration-300 rounded cursor-pointer py-2 px-[30%]"
        >
          Log out
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
