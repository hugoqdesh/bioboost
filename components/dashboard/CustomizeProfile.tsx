"use client";

import Head from "next/head";
import React, { useState, useMemo } from "react";

type Link = {
  title: string;
  url: string;
  image: string | null;
};

const CustomizeProfile = () => {
  const [background, setBackground] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [borderColor, setBorderColor] = useState("#000000");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [newLinkImage, setNewLinkImage] = useState<File | null>(null);
  const [links, setLinks] = useState<Link[]>([]);

  const backgroundPreview = useMemo(
    () =>
      background && (
        <img
          src={URL.createObjectURL(background)}
          alt="Background Preview"
          className="mt-2 w-32 h-auto"
        />
      ),
    [background]
  );

  const avatarPreview = useMemo(
    () =>
      avatar && (
        <img
          src={URL.createObjectURL(avatar)}
          alt="Avatar Preview"
          className="mt-2 w-32 h-auto"
        />
      ),
    [avatar]
  );

  return (
    <div className="min-h-screen py-10">
      <Head>
        <title>Customize Profile</title>
      </Head>
      <div className="max-w-4xl mx-auto shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Customize Your Profile
        </h1>

        {/* Background */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Background
          </h2>
          <div className="mb-4 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setBackground(e.target.files ? e.target.files[0] : null)
              }
              className="px-4 py-2 border rounded w-full"
            />
          </div>
          {backgroundPreview}
        </section>

        {/* Avatar */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Avatar</h2>
          <div className="mb-4 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setAvatar(e.target.files ? e.target.files[0] : null)
              }
              className="px-4 py-2 border rounded w-full"
            />
          </div>
          {avatarPreview}
        </section>

        {/* Card Border Color */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Card Border Color
          </h2>
          <div className="mb-4 text-center">
            <input
              type="text"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              placeholder="Enter hex code (e.g., #RRGGBB)"
              className="p-1 text-white rounded w-full text-center border border-gray-300 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            />
            <div
              className="mt-2 w-20 h-10 border flex m-auto"
              style={{ borderColor: borderColor }}
            ></div>
          </div>
        </section>

        {/* Name */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Name</h2>
          <div className="mb-4 text-center">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="p-1 text-white rounded w-full text-center border border-gray-300 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            />
          </div>
        </section>

        {/* Bio */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Bio</h2>
          <div className="mb-4 text-center">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter your bio"
              className="p-1 text-white rounded w-full text-center border border-gray-300 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
              rows={4}
            ></textarea>
          </div>
        </section>

        {/* Links */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Links</h2>
          <div className="mb-4 text-center">
            <input
              type="text"
              value={newLinkTitle}
              onChange={(e) => setNewLinkTitle(e.target.value)}
              placeholder="Enter link title"
              className="p-1 text-white rounded w-full text-center border border-gray-300 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 mb-2"
            />
            <input
              type="text"
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
              placeholder="Enter link URL"
              className="p-1 text-white rounded w-full text-center border border-gray-300 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewLinkImage(e.target.files ? e.target.files[0] : null)
              }
              className="px-4 py-2 border rounded w-full"
            />
            <button
              onClick={() => {
                if (newLinkTitle.trim() !== "" && newLinkUrl.trim() !== "") {
                  setLinks([
                    ...links,
                    {
                      title: newLinkTitle.trim(),
                      url: newLinkUrl.trim(),
                      image: newLinkImage
                        ? URL.createObjectURL(newLinkImage)
                        : null,
                    },
                  ]);
                  setNewLinkTitle("");
                  setNewLinkUrl("");
                  setNewLinkImage(null);
                }
              }}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none w-full mt-2"
            >
              Add
            </button>
          </div>
          <ul className="mt-2">
            {links.map((link, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-2"
              >
                <div className="flex items-center">
                  {link.image && (
                    <img
                      src={link.image}
                      alt="Link Preview"
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                  )}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {link.title}
                  </a>
                </div>
                <button
                  onClick={() => setLinks(links.filter((_, i) => i !== index))}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>

        <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none flex m-auto">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default CustomizeProfile;
