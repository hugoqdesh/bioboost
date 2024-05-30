"use client";

import React from "react";
import { InfiniteMovingCardsDemo } from "./Card";
import { FaRegPlayCircle } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

const MainPage = () => {
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 mt-32 md:mt-20 items-center text-center md:text-start">
        <div className="md:ml-0 lg:ml-4 xl:ml-0">
          <motion.h1
            className="text-4xl md:text-5xl mb-3 font-semibold leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Make <span className="text-blue-500">Zylo</span> your{" "}
            <span className="text-blue-500">bio</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Kickstart your bio journey with Zylo! {/*Join 3,000+ users and */}
            spread your bio across platforms like{" "}
            <span className="text-[#E1306C]">Instagram</span>,{" "}
            <span className="text-[#7289da]">Discord</span>,{" "}
            <span className="text-[#FE2C55]">TikTok</span>,{" "}
            <span className="text-[#FF0000]">YouTube</span>, and more.
          </motion.p>

          <motion.a
            href="/dashboard/settings"
            className="bg-blue-500 px-8 py-3 rounded-md text-white text-xl font-semibold hover:bg-blue-600 transition duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Get Started
          </motion.a>
        </div>
        <motion.div
          className="flex justify-center md:justify-end lg:mr-4 xl:ml-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/shots.png"
            alt="Bio Site"
            className="pointer-events-none select-none"
          />
        </motion.div>
      </div>

      <div className="text-center mt-48">
        <motion.p
          className="mb-3 text-5xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Trusted by top{" "}
          <span className="text-blue-500"> creators worldwide </span>
        </motion.p>
        <motion.p
          className="text-xl text-gray-400"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Don&apos;t wait – become one of us today!
        </motion.p>
        <InfiniteMovingCardsDemo />
      </div>

      <div className="mt-32 mb-16">
        <Link href="/" className="flex flex-col items-center ">
          <img src="" alt="" />
          <motion.div
            className="animate-bounce"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <FaRegPlayCircle size={35} />
          </motion.div>
          <motion.p
            className="text-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            WATCH A VIDEO
          </motion.p>
          <motion.p
            className="text-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            how it works
          </motion.p>
        </Link>
      </div>
    </section>
  );
};

export default MainPage;
