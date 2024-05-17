import React from "react";
import { InfiniteMovingCardsDemo } from "./Card";
import { FaRegPlayCircle } from "react-icons/fa";
import Link from "next/link";

const MainPage = () => {
  return (
    <main className="container mx-auto">
      <section className="grid grid-cols-1 md:grid-cols-2 mt-32 md:mt-20 items-center text-center md:text-start">
        <div className="md:ml-0 lg:ml-4 xl:ml-0">
          <h1 className="text-4xl md:text-5xl mb-3 font-semibold leading-tight ">
            Make <span className="text-blue-500">BioBoost</span> your{" "}
            <span className="text-blue-500">bio</span>
          </h1>
          <p className="text-lg md:text-xl mb-5 leading-relaxed">
            Kickstart your bio journey with BioBoost! Join 5,000+ users and
            spread your bio across platforms like{" "}
            <span className="text-[#E1306C]">Instagram</span>,{" "}
            <span className="text-[#7289da]">Discord</span>,{" "}
            <span className="text-[#FE2C55]">TikTok</span>,{" "}
            <span className="text-[#FF0000]">YouTube</span>, and more.
          </p>

          <button className="bg-blue-500 px-8 py-3 rounded-md text-white text-xl font-semibold hover:bg-blue-600 transform transition-transform duration-300 hover:scale-105">
            Get Started
          </button>
        </div>
        <div className="flex justify-center md:justify-end lg:mr-4 xl:ml-0">
          <img src="/biosite.png" alt="Bio Site" />
        </div>
      </section>

      <section className="text-center mt-48">
        <p className="mb-3 text-5xl">
          Trusted by top{" "}
          <span className="text-blue-500"> creators worldwide </span>
        </p>
        <p className="text-xl text-gray-400">
          Don&apos;t wait – become one of us today!
        </p>
        <InfiniteMovingCardsDemo />
      </section>

      <section className="mt-32 mb-16">
        <Link href="/" className="flex flex-col items-center ">
          <img src="" alt="" />
          <FaRegPlayCircle className="animate-bounce" size={35} />
          <p className="text-3xl">WATCH A VIDEO</p>
          <p className="text-xl">how it works</p>
        </Link>
      </section>
    </main>
  );
};

export default MainPage;
