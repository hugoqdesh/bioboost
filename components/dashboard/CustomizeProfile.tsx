"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { ClipLoader } from "react-spinners";
import {
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaSpotify,
  FaGlobe,
} from "react-icons/fa";

type SocialPlatforms =
  | "website"
  | "github"
  | "twitter"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "spotify";

const socialIcons: Record<SocialPlatforms, React.ReactNode> = {
  website: <FaGlobe />,
  github: <FaGithub />,
  twitter: <FaTwitter />,
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
  tiktok: <FaTiktok />,
  spotify: <FaSpotify />,
};

const TextInput: React.FC<{
  value: string;
  onChange: any;
  placeholder: string;
  icon?: React.ReactNode;
}> = ({ value, onChange, placeholder, icon }) => (
  <div className="flex items-center mb-2">
    {icon && <div className="mr-2 text-xl text-white">{icon}</div>}
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="text-white rounded w-full text-start px-2.5 py-1.5 border border-white/5 bg-white/5 hover:border-white/10 placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
    />
  </div>
);

const TextareaInput: React.FC<{
  value: string;
  onChange: any;
  placeholder: string;
}> = ({ value, onChange, placeholder }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={5}
    className="text-white rounded w-full text-start px-2.5 py-1.5 border border-white/5 bg-white/5 hover:border-white/10 placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 mb-2 resize-none"
  />
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold text-start mb-1">{title}</h2>
    <div>{children}</div>
  </section>
);

const CustomizeProfile: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [background, setBackground] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [borderColor, setBorderColor] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [usernames, setUsernames] = useState<{ [key: string]: string }>({});
  const [spotifyTrack, setSpotifyTrack] = useState<string>("");

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/getUserProfile?userId=${userId}`);
          const data = await response.json();
          if (response.ok) {
            const links = data.user.links || {};
            const baseUrls: Record<SocialPlatforms, string> = {
              website: "",
              github: "https://github.com/",
              twitter: "https://twitter.com/",
              instagram: "https://www.instagram.com/",
              youtube: "https://www.youtube.com/",
              tiktok: "https://www.tiktok.com/@",
              spotify: "https://open.spotify.com/user/",
            };

            const parsedUsernames = Object.keys(links).reduce((acc, key) => {
              const baseUrl = baseUrls[key as SocialPlatforms];
              acc[key] = links[key].replace(baseUrl, "");
              return acc;
            }, {} as { [key: string]: string });

            setBackground(data.user.backgroundImage || "");
            setAvatar(data.user.image);
            setName(data.user.name);
            setBio(data.user.bio || "");
            setUsername(data.user.username);
            setBorderColor(data.user.borderColor);
            setBackgroundColor(data.user.backgroundColor || "");
            setUsernames(parsedUsernames);
            setSpotifyTrack(data.user.spotifyTrack || "");
          } else {
            setError(data.message);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setError("An unexpected error occurred");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [userId]);

  const avatarPreview = useMemo(
    () =>
      avatar && (
        <div className="mb-4">
          <Image
            src={avatar}
            alt="Avatar Preview"
            width={128}
            height={128}
            className="w-32 h-auto rounded"
          />
        </div>
      ),
    [avatar]
  );

  const backgroundPreview = useMemo(
    () =>
      background && (
        <div className="mt-4">
          <Image
            src={background}
            alt="Background Preview"
            width={128}
            height={128}
            className="w-32 h-auto"
          />
        </div>
      ),
    [background]
  );

  const profileSchema = z.object({
    name: z.string().nonempty("Name is required"),
    bio: z.string().max(150).nullable(),
    background: z.string().url().optional().or(z.literal("")),
    avatar: z.string().nonempty("Avatar is required").url().optional(),
    borderColor: z.string().max(7).optional(),
    backgroundColor: z.string().max(7).optional(),
    links: z.record(z.string().url()).optional(),
    spotifyTrack: z.string().url().nullable().or(z.literal("")),
  });

  const handleSaveChanges = async () => {
    setMessage(null);
    setError(null);
    setSaving(true);

    if (!userId) {
      setError("User not authenticated");
      setSaving(false);
      return;
    }

    try {
      const baseUrls: Record<SocialPlatforms, string> = {
        website: "",
        github: "https://github.com/",
        twitter: "https://twitter.com/",
        instagram: "https://www.instagram.com/",
        youtube: "https://www.youtube.com/",
        tiktok: "https://www.tiktok.com/@",
        spotify: "https://open.spotify.com/user/",
      };

      const fullLinks = Object.keys(usernames).reduce((acc, key) => {
        if (usernames[key]) {
          acc[key] = `${baseUrls[key as SocialPlatforms]}${usernames[key]}`;
        }
        return acc;
      }, {} as { [key: string]: string });

      profileSchema.parse({
        name,
        bio,
        background,
        avatar,
        borderColor,
        backgroundColor,
        links: fullLinks,
        spotifyTrack,
      });

      const response = await fetch("/api/updateUser", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          newName: name,
          newImage: avatar,
          newBio: bio === "" ? null : bio,
          newBackgroundImage: background === "" ? null : background,
          newBorderColor: borderColor,
          newBackgroundColor: backgroundColor,
          newLinks: fullLinks,
          newSpotifyTrack: spotifyTrack === "" ? null : spotifyTrack,
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
      setSaving(false);
    }
  };

  const handleLinkChange = (key: string, value: string) => {
    setUsernames((prevUsernames) => ({
      ...prevUsernames,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen py-10 lg:max-w-2xl 2xl:max-w-4xl xl:ml-[23em] lg:ml-[17em] 2xl:mx-auto px-4 md:px-0">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="text-center">
            <ClipLoader size={50} color={"#fff"} loading={loading} />
            <p className="text-white mt-4">Loading your profile...</p>
          </div>
        </div>
      ) : (
        <div className="rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Customize Your Profile
          </h1>

          {username ? (
            <a
              href={`/${username}`}
              className="text-blue-500 text-center mb-5 block hover:underline"
              target="_blank"
            >
              View your profile
            </a>
          ) : (
            <a
              href="/dashboard/settings"
              className="text-red-500 text-center mb-5 block hover:underline"
            >
              Set a username to view your profile
            </a>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Section title="Profile Details">
              <TextInput
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                placeholder="Ryan Gosling"
              />
              <TextareaInput
                value={bio}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setBio(e.target.value)
                }
                placeholder="Type your bio"
              />
            </Section>

            <Section title="Profile Images">
              <p className="text-sm mb-2 text-white/70">
                (use high quality images)
              </p>
              <TextInput
                value={avatar}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAvatar(e.target.value)
                }
                placeholder="Enter your avatar URL"
              />
              {avatarPreview}
              <TextInput
                value={background}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBackground(e.target.value)
                }
                placeholder="Enter your background URL (optional)"
              />
              {backgroundPreview}
            </Section>
          </div>

          <Section title="Profile Background Color">
            <TextInput
              value={backgroundColor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBackgroundColor(e.target.value)
              }
              placeholder="Background color (hex code)"
            />
          </Section>

          <Section title="Profile Border Color">
            <TextInput
              value={borderColor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBorderColor(e.target.value)
              }
              placeholder="Border color (hex code)"
            />
          </Section>

          <Section title="Profile Links">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "website",
                "github",
                "twitter",
                "instagram",
                "youtube",
                "tiktok",
                "spotify",
              ].map((platform) => (
                <TextInput
                  key={platform}
                  value={usernames[platform] || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleLinkChange(platform, e.target.value)
                  }
                  placeholder={
                    platform === "website"
                      ? "website URL"
                      : `${platform} username`
                  }
                  icon={socialIcons[platform as SocialPlatforms]}
                />
              ))}
            </div>
          </Section>

          <Section title="Spotify Track">
            <TextInput
              value={spotifyTrack}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSpotifyTrack(e.target.value)
              }
              placeholder="Spotify song URL"
            />
          </Section>

          {error && (
            <div className="bg-red-500 text-center font-bold text-white p-2 rounded mb-4">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-500 text-center font-bold text-white p-2 rounded mb-4">
              {message}
            </div>
          )}

          <div className="text-center mt-8 mb-4">
            <button
              onClick={handleSaveChanges}
              className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-200"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizeProfile;
