"use client";

import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { FaDiscord } from "react-icons/fa";

type User = {
  name?: string | null;
  backgroundImage?: string | null;
  bio?: string | null;
  image?: string | null;
};

type ProfileClientComponentProps = {
  user: User;
};

const ProfileClientComponent = ({ user }: ProfileClientComponentProps) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
          height: 100%;
          overflow: hidden; /* Ensure no scrollbars */
        }

        .background-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .background-image {
          opacity: 0.3;
        }
      `}</style>
      {user.backgroundImage && (
        <div className="background-container">
          <Image
            src={user.backgroundImage}
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="background-image"
          />
        </div>
      )}
      <div className="max-w-2xl w-full p-8">
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          scale={1.05}
          className="rounded-lg shadow-lg overflow-hidden border border-gray-300"
        >
          <div className="bg-opacity-50 backdrop-filter backdrop-blur-lg p-6">
            <div className="text-center">
              {user.image && (
                <Image
                  src={user.image}
                  alt="Profile Picture"
                  width={100}
                  height={100}
                  className="rounded-full mx-auto"
                />
              )}
              {user.name && (
                <h1 className="text-2xl font-bold mt-4 text-white">
                  {user.name}
                </h1>
              )}
              {user.bio && <p className="text-gray-300">{user.bio}</p>}
            </div>
            <div className="flex justify-center mt-4 items-center">
              <FaDiscord size={18} className="text-blue-600 mr-1" />
              <a href="" className="text-blue-600 hover:underline">
                Join Discord
              </a>
            </div>
          </div>
        </Tilt>
      </div>
    </div>
  );
};

export default ProfileClientComponent;
