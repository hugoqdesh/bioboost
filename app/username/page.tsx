"use client";

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/submit-username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (response.ok) {
      // Handle success
      setSuccess(true);
      setError(null);
    } else {
      // Handle error
      const data = await response.json();
      console.error("Failed to save username:", data.error);
      setError(data.error || "Failed to save username");
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
        onSubmit={handleSubmit}
        className="flex gap-2 justify-center items-center mb-6 flex-col"
      >
        <label className="text-md text-white/90" htmlFor="username">
          bioboost/
        </label>
        <input
          id="username"
          name="username"
          className="p-1 text-white rounded w-72 text-center border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 hover:border-blue-500 hover:ring-1 hover:ring-blue-500 hover:ring-opacity-50 bg-[#13151a] placeholder:text-white/50"
          type="text"
          placeholder="TylerDurden"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="bg-blue-500 px-8 py-3 rounded-md text-white text-xl font-semibold hover:bg-blue-600 transition duration-200 mt-3">
          Continue
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && (
        <p className="text-green-500 mt-2">Username saved successfully!</p>
      )}
    </div>
  );
}
