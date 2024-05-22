"use client";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { FaDiscord, FaTwitter, FaSpotify } from "react-icons/fa";
import { FiLink } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {" "}
      {/* Add relative positioning */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
          height: 100%; /* Ensure full height */
        }

        #video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.3;
        }
      `}</style>
      <video id="video-background" autoPlay loop muted>
        <source src="/videotest.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="max-w-2xl w-full p-8">
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          scale={1.05}
          className="rounded-lg shadow-lg overflow-hidden border border-gray-300"
        >
          <div className="bg-opacity-50 backdrop-filter backdrop-blur-lg p-6">
            <div className="text-center">
              <Image
                src=""
                alt=""
                width={100}
                height={100}
                className="rounded-full mx-auto"
              />
              <h1 className="text-2xl font-bold mt-4 text-white">Hj</h1>
              <p className="text-gray-300">hey im tiny</p>
            </div>
          </div>
        </Tilt>
      </div>
    </div>
  );
}
