"use client";

import Head from "next/head";
import React, { useState } from "react";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [font, setFont] = useState("sans-serif");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="min-h-screen py-10">
      <Head>
        <title>User Settings</title>
      </Head>
      <div className="max-w-4xl mx-auto shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8">User Settings</h1>

        {/* Account Info */}
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
              className="p-1 text-white rounded w-full h-12 text-start border border-gray-300 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            />
          </div>
        </section>

        {/* Bio Customization */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Bio Customization</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="font">
              Font
            </label>
            <select
              id="font"
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className="p-1 text-white rounded w-full h-12 text-start border border-gray-300 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            >
              <option value="sans-serif">Sans Serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>
        </section>

        {/* SEO Settings */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">SEO Settings</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-1 text-white rounded w-full h-12 text-start border border-gray-300 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
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
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-1 text-white rounded w-full h-16 text-start border border-gray-300 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
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
          <div className="mb-4">
            <button className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
