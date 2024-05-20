"use client";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { FaDiscord, FaTwitter, FaSpotify } from "react-icons/fa";
import { FiLink } from "react-icons/fi";

const profile = {
  name: "HJ ☦",
  avatar:
    "https://i.pinimg.com/564x/e3/b6/ed/e3b6edb6a894b93f1ec7ba828325669f.jpg",
  bio: "Hallo, im a web developer",
  views: 504,
  socialLinks: [
    { icon: <FaDiscord />, url: "https://discord.com", label: "Discord" },
    { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
    { icon: <FaSpotify />, url: "https://spotify.com", label: "Spotify" },
    { icon: <FiLink />, url: "https://link.com", label: "Website" },
  ],
  content: [
    {
      track: {
        title: "Skyfall",
        artist: "SamuVFX",
        url: "https://youtu.be/F3wJzNQUivw?si=D2Zf9RnaIAqM9c2t",
        duration: "4:12",
        currentTime: "0:00",
        cover:
          "https://i.pinimg.com/originals/92/6e/c1/926ec1304586f8a447dde710a4f7d7ff.jpg",
      },
    },
    {
      name: "AresProject",
      url: "https://discord.gg/aresproject",
      label: "Join Discord",
      icon: <FaDiscord />,
    },
  ],
};

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
                src={profile.avatar}
                alt={profile.name}
                width={100}
                height={100}
                className="rounded-full mx-auto"
              />
              <h1 className="text-2xl font-bold mt-4 text-white">
                {profile.name}
              </h1>
              <p className="text-gray-300">{profile.bio}</p>
              <p className="text-gray-400 mt-1">Views: {profile.views}</p>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              {profile.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-gray-300 hover:text-white transform transition duration-300 hover:scale-110 text-xl"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="mt-4">
              {profile.content.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
                >
                  {item.track && (
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.track.cover}
                        alt={item.track.title}
                        width={40}
                        height={40}
                        className="rounded"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-white">
                          {item.track.title}
                        </p>
                        <p className="text-gray-300">{item.track.artist}</p>
                        <p className="text-gray-400">
                          {item.track.currentTime} / {item.track.duration}
                        </p>
                      </div>
                    </div>
                  )}
                  {item.name && (
                    <div className="flex justify-center items-center">
                      <a
                        href={item.url}
                        className="text-blue-500 hover:underline flex items-center"
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Tilt>
      </div>
    </div>
  );
}
