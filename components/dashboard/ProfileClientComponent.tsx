"use client";

import Image from "next/image";
import Tilt from "react-parallax-tilt";
import {
  FaDiscord,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaSpotify,
  FaGlobe,
} from "react-icons/fa";
import { useState, useEffect } from "react";

type User = {
  name?: string | null;
  backgroundImage?: string | null;
  bio?: string | null;
  image?: string | null;
  borderColor?: string | null;
  links?: { [key: string]: string } | null;
  spotifyTrack?: string | null;
};

type ProfileClientComponentProps = {
  user: User;
};

const linkIcons: Record<string, JSX.Element> = {
  website: <FaGlobe size={20} />,
  github: <FaGithub size={20} />,
  twitter: <FaTwitter size={20} />,
  instagram: <FaInstagram size={20} />,
  youtube: <FaYoutube size={20} />,
  tiktok: <FaTiktok size={20} />,
  spotify: <FaSpotify size={20} />,
  discord: <FaDiscord size={20} />,
};

const ProfileClientComponent = ({ user }: ProfileClientComponentProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      setTimeout(() => {
        setIsLoaded(true);
      }, 2000);
    };

    loadImages();
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {!isLoaded ? (
        <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-black">
          <div className="loading-orb"></div>
        </div>
      ) : (
        <>
          {user.backgroundImage && (
            <div className="fixed top-0 left-0 w-full h-full">
              <Image
                src={user.backgroundImage ?? ""}
                alt="Background Image"
                layout="fill"
                objectFit="cover"
                className="opacity-30 pointer-events-none select-none"
              />
            </div>
          )}
          <div className="max-w-2xl w-full p-8">
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              scale={1.05}
              className="rounded-lg shadow-lg overflow-hidden"
              style={{ border: `2px solid ${user.borderColor ?? "#ffffff"}` }}
            >
              <div className="bg-opacity-50 backdrop-filter backdrop-blur-lg p-6">
                <div className="text-center">
                  {user.image && (
                    <Image
                      src={user.image ?? ""}
                      alt="Profile Picture"
                      width={100}
                      height={100}
                      className="rounded-full mx-auto pointer-events-none select-none"
                    />
                  )}
                  {user.name && (
                    <h1 className="text-2xl font-bold mt-4 text-white">
                      {user.name}
                    </h1>
                  )}

                  {user.bio && <p className="text-gray-300">{user.bio}</p>}
                </div>
                <div className="mb-4 flex flex-wrap justify-center">
                  {user.links &&
                    Object.entries(user.links).map(([key, url]) => (
                      <div key={key} className="flex justify-center mt-2">
                        <a
                          href={url}
                          className="flex text-white hover:underline mr-2 p-2 duration-300 hover:brightness-50 rounded-full bg-opacity-50 backdrop-blur-md translate-y-0 opacity-100"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {linkIcons[key] || (
                            <FaGlobe size={24} className="mr-2 self-center" />
                          )}
                        </a>
                      </div>
                    ))}
                </div>
                {user.spotifyTrack && (
                  <div className="mt-4 text-center">
                    <iframe
                      src={`https://open.spotify.com/embed/track/${user.spotifyTrack
                        .split("/")
                        .pop()}`}
                      width="full"
                      height="80"
                      allow="encrypted-media"
                      className="mx-auto"
                    />
                  </div>
                )}
              </div>
            </Tilt>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileClientComponent;
