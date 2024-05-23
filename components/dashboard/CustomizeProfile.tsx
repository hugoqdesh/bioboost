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
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

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

  const handleSaveChanges = async () => {
    if (!userId) {
      alert("User not authenticated");
      return;
    }

    try {
      const response = await fetch("/api/updateUser", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          newName: name,
          newImage: avatar,
          newBio: bio,
          newBackgroundImage: background,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(`Error: ${data.message}`);
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
      <div className="max-w-4xl mx-auto rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Customize Your Profile
        </h1>

        <Section title="Background">
          <TextInput
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="Enter background image URL"
          />
          {backgroundPreview}
        </Section>

        <Section title="Avatar">
          <TextInput
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="Enter avatar image URL"
          />
          {avatarPreview}
        </Section>

        <Section title="Name">
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </Section>

        <Section title="Bio">
          <TextareaInput
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter your bio"
          />
        </Section>

        <button
          onClick={handleSaveChanges}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none flex m-auto transition duration-200"
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
    <h2 className="text-2xl font-semibold text-start mb-1">{title}</h2>
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
    className="text-white rounded w-full text-start px-2.5 py-1.5 border border-white/5 bg-white/5 hover:border-white/10 placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 mb-2"
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
    rows={5}
    className="text-white rounded w-full text-start px-2.5 py-1.5 border border-white/5 bg-white/5 hover:border-white/10 placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 mb-2 resize-none"
  />
);

export default CustomizeProfile;
