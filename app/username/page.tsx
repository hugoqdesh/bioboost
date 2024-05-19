"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/updateUsername", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newUsername }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message || "An error occurred");
      }
    } catch (error) {
      alert("An error occurred: " + error);
    }
  };

  return (
    <div className="mt-40 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-3 text-center text-blue-500">
        Your BioBoost Username
      </h1>
      <p className="text-gray-400 text-center text-sm mb-6">
        Tip: use the same one as your Social Media
      </p>
      <form
        className="flex gap-2 justify-center items-center mb-6 flex-col"
        onSubmit={handleSubmit}
      >
        <label className="text-md text-white/90" htmlFor="email">
          email
        </label>
        <input
          className="p-1 text-white rounded w-72 text-center border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 hover:border-blue-500 hover:ring-1 hover:ring-blue-500 hover:ring-opacity-50 bg-[#13151a] placeholder:text-white/50"
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
        />

        <label className="text-md text-white/90" htmlFor="username">
          bioboost/
        </label>
        <input
          className="p-1 text-white rounded w-72 text-center border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 hover:border-blue-500 hover:ring-1 hover:ring-blue-500 hover:ring-opacity-50 bg-[#13151a] placeholder:text-white/50"
          type="text"
          id="username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="TylerDurden"
        />
        <button
          type="submit"
          className="bg-blue-500 px-8 py-3 rounded-md text-white text-xl font-semibold hover:bg-blue-600 transition duration-200 mt-3"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
