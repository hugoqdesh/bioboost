import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and copyright */}
        <div className="md:col-span-1 flex flex-col items-center">
          <p className="text-2xl text-white flex items-center">Zylo</p>
          <p className="mt-4 text-center text-white/50">
            © {new Date().getFullYear()} Zylo. All rights reserved.
          </p>
          <p className="mt-3 text-center text-white/50">
            Made with <span className="text-white">❤️</span> by{" "}
            <span className="font-semibold text-blue-500 cursor-pointer">
              HJ
            </span>
          </p>
        </div>

        {/* Legal Links */}
        <div className="md:col-span-1">
          <h4 className="text-lg font-semibold mb-4 text-center text-blue-500">
            Legal
          </h4>
          <ul className="space-y-2">
            <li className="text-center">
              <Link
                href="/refund"
                passHref
                className="text-white/50 hover:text-white transition duration-200"
              >
                Refund Policy
              </Link>
            </li>
            <li className="text-center">
              <Link
                href="/privacy"
                passHref
                className="text-white/50 hover:text-white transition duration-200"
              >
                Privacy
              </Link>
            </li>
            <li className="text-center">
              <Link
                href="/tos"
                passHref
                className="text-white/50 hover:text-white transition duration-200"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Help Links */}
        <div className="md:col-span-1">
          <h4 className="text-lg font-semibold mb-4 text-center text-blue-500">
            Help
          </h4>
          <ul className="space-y-2">
            <li className="text-center">
              <Link
                href="/"
                passHref
                className="text-white/50 hover:text-white transition duration-200"
              >
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
