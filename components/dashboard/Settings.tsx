"use client";

import Head from "next/head";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [font, setFont] = useState("sans-serif");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const deleteUser = async () => {
    try {
      setLoading(true);

      if (!session) {
        console.error("User is not authenticated");
        return;
      }

      const response = await fetch("/api/deleteUser", {
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
        console.error("Failed to delete account");
        alert("Failed to delete account");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Error deleting account");
      setLoading(false);
    }
  };

  const updateEmail = async () => {
    try {
      if (!session) {
        console.error("User is not authenticated");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.error("Invalid email format");
        alert("Please enter a valid email address");
        return;
      }

      const response = await fetch("/api/updateEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentEmail: session.user?.email,
          newEmail: email,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        alert(data.message);
      } else {
        console.error("Failed to update email");
        alert("Failed to update email");
      }
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const onClick = () => {
    signOut();
  };

  return (
    <div className="min-h-screen py-10 max-w-md mx-auto">
      <div className="max-w-4xl mx-auto shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-10">User Settings</h1>

        {session && ( // Check if session exists
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
                className="p-1 hover:border-blue-500 text-white rounded w-full h-12 text-start border border-gray-300 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
              />
            </div>
            <button
              onClick={updateEmail}
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Email
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
              className="p-1 text-white rounded w-full h-12 text-start border border-gray-500 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            >
              <option value="sans-serif">Sans Serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>
        </section>

        {/* SEO Settings */}
        <section className="mb-8 text-gray-500">
          <h2 className="text-2xl font-semibold mb-6">SEO Settings</h2>
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
              className="p-1 text-white rounded w-full h-12 text-start border border-gray-500 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
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
              className="p-1 text-white rounded w-full h-16 text-start border border-gray-500 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            />
          </div>
        </section>

        {/* Billing */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Billing</h2>
          <div className="mb-4">
            <button className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Manage Billing
            </button>
          </div>
        </section>

        {/* Data Management */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Data Management</h2>
          <div className="mb-4 flex flex-col gap-4">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
            <button
              onClick={deleteUser}
              disabled={loading}
              className={`w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
