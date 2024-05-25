"use client";

import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { z } from "zod";

const Settings = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [font, setFont] = useState("sans-serif");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/getUserProfile?userId=${userId}`);
          const data = await response.json();
          if (response.ok) {
            setEmail(data.user.email);
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

  const deleteUser = async () => {
    try {
      setLoading(true);
      setMessage(null);
      setError(null);

      if (!session) {
        setError("User is not authenticated");
        return;
      }

      const response = await fetch("/api/updateSettings", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
        }),
      });

      if (response.ok) {
        await signOut({ callbackUrl: "/" });
      } else {
        const data = await response.json();
        setError("Failed to delete account: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setError("Error deleting account");
    } finally {
      setLoading(false);
    }
  };

  const emailSchema = z.string().email("Invalid email format");
  const usernameSchema = z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters")
    .regex(/^[a-zA-Z]+$/, "Username cannot contain numbers");

  const updateEmail = async () => {
    try {
      setMessage(null);
      setError(null);

      if (!session) {
        setError("User is not authenticated");
        return;
      }

      const result = emailSchema.safeParse(email);
      if (!result.success) {
        setError(result.error.errors[0].message);
        return;
      }

      const response = await fetch("/api/updateSettings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          newEmail: email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else if (
        response.status === 400 &&
        data.message === "Email already taken"
      ) {
        setError("Email is already taken");
      } else {
        setError("Failed to update email: " + data.message);
      }
    } catch (error) {
      console.error("Error updating email:", error);
      setError("Error updating email");
    }
  };

  const updateUsername = async () => {
    try {
      setMessage(null);
      setError(null);

      if (!session) {
        setError("User is not authenticated");
        return;
      }

      const result = usernameSchema.safeParse(username);
      if (!result.success) {
        setError(result.error.errors[0].message);
        return;
      }

      const response = await fetch("/api/updateSettings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          newUsername: username,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const data = await response.json();
        if (
          response.status === 400 &&
          data.message === "Username already taken"
        ) {
          setError("Username is already taken");
        } else {
          setError("Failed to update username: " + data.message);
        }
      }
    } catch (error) {
      console.error("Error updating username:", error);
      setError("Error updating username");
    }
  };

  return (
    <div className="min-h-screen py-10 max-w-md mx-auto">
      <div className="max-w-4xl mx-auto rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-10">User Settings</h1>

        {message && (
          <p className="text-green-500 text-center mb-5">{message}</p>
        )}
        {error && <p className="text-red-500 text-center mb-5">{error}</p>}

        {session && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Account Info</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-white rounded w-full text-start px-2.5 py-1.5 border border-white/5 bg-white/5 hover:border-white/10 placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 mb-2"
              />
            </div>
            <button
              onClick={updateEmail}
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Email
            </button>

            <div className="mb-4 mt-8">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-white rounded w-full text-start px-2.5 py-1.5 border border-white/5 bg-white/5 hover:border-white/10 placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 mb-2"
              />
            </div>
            <button
              onClick={updateUsername}
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Username
            </button>
          </section>
        )}

        {/* Bio Customization */}
        <section className="mb-8 text-gray-500">
          <h2 className="text-2xl font-semibold mb-6">Bio Customization</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="font">
              Font
            </label>
            <select
              disabled
              id="font"
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className="text-white rounded w-full text-start px-2.5 py-1.5 border border-white/5 bg-white/5 hover:border-white/10 placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 mb-2"
            >
              <option value="sans-serif">Sans Serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="title">
              Title
            </label>
            <input
              disabled
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-white rounded w-full text-start px-2.5 py-1.5 border border-white/5 bg-white/5 hover:border-white/10 placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 mb-2"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              disabled
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="text-white rounded w-full text-start px-2.5 py-1.5 border border-white/5 bg-white/5 hover:border-white/10 placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 mb-2"
            />
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Danger Zone</h2>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors mb-4"
          >
            Sign Out
          </button>
          <button
            onClick={deleteUser}
            className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {loading ? "Deleting..." : "Delete Account"}
          </button>
        </section>
      </div>
    </div>
  );
};

export default Settings;
