"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { z } from "zod";

const CustomizeProfile = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [background, setBackground] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/getUserProfile?userId=${userId}`);
          const data = await response.json();
          if (response.ok) {
            setBackground(data.user.backgroundImage);
            setAvatar(data.user.image);
            setName(data.user.name);
            setBio(data.user.bio || "");
            setUsername(data.user.username);
          } else {
            setError(data.message);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setError("An unexpected error occurred");
        }
      }
    };

    fetchUserProfile();
  }, [userId]);

  const backgroundPreview = useMemo(
    () =>
      background && (
        <Image
          src={background}
          alt="Background Preview"
          width={128}
          height={128}
          className="mt-2 w-32 h-auto"
        />
      ),
    [background]
  );

  const avatarPreview = useMemo(
    () =>
      avatar && (
        <Image
          src={avatar}
          alt="Avatar Preview"
          width={128}
          height={128}
          className="mt-2 w-32 h-auto rounded"
        />
      ),
    [avatar]
  );

  const profileSchema = z.object({
    name: z
      .string()
      .min(3, "Name must be between 3 and 15 characters long")
      .max(15, "Name must be between 3 and 15 characters long")
      .nonempty("Name cannot be empty"),
    bio: z.string().max(200, "Bio must be 200 characters or fewer").optional(),
    background: z
      .string()
      .url("Invalid background URL")
      .nonempty("Background URL cannot be empty"),
    avatar: z
      .string()
      .url("Invalid avatar URL")
      .nonempty("Avatar URL cannot be empty"),
  });

  const handleSaveChanges = async () => {
    setMessage(null);
    setError(null);
    setLoading(true);

    if (!userId) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      profileSchema.parse({ name, bio, background, avatar });

      const response = await fetch("/api/updateUser", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          newName: name,
          newImage: avatar,
          newBio: bio === "" ? null : bio,
          newBackgroundImage: background,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(`Error: ${data.message}`);
      }
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        setError(validationError.errors[0].message);
      } else {
        console.error("Error:", validationError);
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 max-w-md mx-auto">
      <div className="max-w-4xl mx-auto rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Customize Your Profile
        </h1>

        {username ? (
          <a
            href={`/${username}`}
            className="text-blue-500 text-center mb-5 flex w-[200px] mx-auto justify-center hover:underline"
          >
            View your profile
          </a>
        ) : (
          <a
            href="/dashboard/settings"
            className="text-red-500 text-center mb-5 flex w-[200px] mx-auto justify-center hover:underline"
          >
            No username
          </a>
        )}

        {message && (
          <p className="text-green-500 text-center mb-5">{message}</p>
        )}
        {error && <p className="text-red-500 text-center mb-5">{error}</p>}

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
          disabled={loading}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none flex m-auto transition duration-200"
        >
          {loading ? "Saving..." : "Save Changes"}{" "}
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
