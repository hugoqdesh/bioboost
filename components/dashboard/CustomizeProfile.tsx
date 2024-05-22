"use client";

import Head from "next/head";
import React, { useState, useMemo } from "react";
import { useSession } from "next-auth/react";

type Link = {
  title: string;
  url: string;
  image: string | null;
};

const CustomizeProfile = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [background, setBackground] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [borderColor, setBorderColor] = useState("#000000");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [newLinkImage, setNewLinkImage] = useState<string | null>(null);
  const [links, setLinks] = useState<Link[]>([]);

  const backgroundPreview = useMemo(
    () =>
      background && (
        <img
          src={background}
          alt="Background Preview"
          className="mt-2 w-32 h-auto"
        />
      ),
    [background]
  );

  const avatarPreview = useMemo(
    () =>
      avatar && (
        <img src={avatar} alt="Avatar Preview" className="mt-2 w-32 h-auto" />
      ),
    [avatar]
  );

  const handleAddLink = () => {
    if (newLinkTitle.trim() !== "" && newLinkUrl.trim() !== "") {
      setLinks([
        ...links,
        {
          title: newLinkTitle.trim(),
          url: newLinkUrl.trim(),
          image: newLinkImage,
        },
      ]);
      setNewLinkTitle("");
      setNewLinkUrl("");
      setNewLinkImage(null);
    }
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSaveChanges = async () => {
    if (!userId) {
      alert("User not authenticated");
      return;
    }

    try {
      // Update background
      const backgroundResponse = await fetch("/api/updateBackgroundImage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newBackgroundImage: background }),
      });

      const backgroundData = await backgroundResponse.json();
      if (!backgroundResponse.ok) {
        alert("Error updating background image");
      } else {
        alert(backgroundData.message);
      }

      // Update avatar
      const imageResponse = await fetch("/api/updateImage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newImage: avatar }),
      });

      const imageData = await imageResponse.json();
      if (imageResponse.ok) {
        alert(imageData.message);
      } else {
        alert("Error updating image");
      }

      // Update name
      const nameResponse = await fetch("/api/updateName", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newName: name }),
      });

      const nameData = await nameResponse.json();
      if (nameResponse.ok) {
        alert(nameData.message);
      } else {
        alert("Error updating name");
      }

      // Update bio
      const bioResponse = await fetch("/api/updateBio", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newBio: bio }),
      });

      const bioData = await bioResponse.json();
      if (!bioResponse.ok) {
        alert("Error updating bio");
      } else {
        alert(bioData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen py-10 max-w-md mx-auto">
      <Head>
        <title>Customize Profile</title>
      </Head>
      <div className="max-w-4xl mx-auto shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Customize Your Profile
        </h1>

        {/* Background Section */}
        <Section title="Background">
          <TextInput
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="Enter background image URL"
          />
          {backgroundPreview}
        </Section>

        {/* Avatar Section */}
        <Section title="Avatar">
          <TextInput
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="Enter avatar image URL"
          />
          {avatarPreview}
        </Section>

        {/* Card Border Color Section */}
        <h1 className="text-center">DO TO IN FUTURE</h1>
        <Section title="Card Border Color">
          <TextInput
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            placeholder="Enter hex code (e.g., #RRGGBB)"
          />
          <div
            className="mt-2 w-20 h-10 border flex m-auto"
            style={{ borderColor: borderColor }}
          ></div>
        </Section>

        {/* Name Section */}
        <Section title="Name">
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </Section>

        {/* Bio Section */}
        <Section title="Bio">
          <TextareaInput
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter your bio"
          />
        </Section>

        {/* Links Section */}
        <h1 className="text-center">MAKE IT WORK IN THE FUTURE</h1>
        <Section title="Links">
          <TextInput
            value={newLinkTitle}
            onChange={(e) => setNewLinkTitle(e.target.value)}
            placeholder="Enter link title"
          />
          <TextInput
            value={newLinkUrl}
            onChange={(e) => setNewLinkUrl(e.target.value)}
            placeholder="Enter link URL"
          />
          <TextInput
            value={newLinkImage || ""}
            onChange={(e) => setNewLinkImage(e.target.value)}
            placeholder="Enter link image URL (optional)"
          />
          <button
            onClick={handleAddLink}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none w-full mt-2"
          >
            Add
          </button>
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
                  onClick={() => handleRemoveLink(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </Section>

        <button
          onClick={handleSaveChanges}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none flex m-auto"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>
    <div className="mb-4 text-center">{children}</div>
  </section>
);

const TextInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="p-1 text-white rounded w-full text-center border border-gray-300 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 mb-2"
  />
);

const TextareaInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="p-1 text-white rounded w-full text-center border border-gray-300 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 mb-2"
  />
);

export default CustomizeProfile;
