"use client";

import Nav from "@/components/Nav";
import React, { useState } from "react";

interface Link {
  id: number;
  title: string;
  url: string;
}

const LinksPage: React.FC = () => {
  const [linkTitle, setLinkTitle] = useState<string>("");
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [links, setLinks] = useState<Link[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (linkTitle.trim() !== "" && linkUrl.trim() !== "") {
      const newLink: Link = {
        id: Date.now(),
        title: linkTitle.trim(),
        url: linkUrl.trim(),
      };
      setLinks([...links, newLink]);
      setLinkTitle("");
      setLinkUrl("");
    }
  };

  return (
    <section>
      <Nav></Nav>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Add Your Links</h1>
        <form
          className="flex flex-col max-w-md mx-auto gap-4 mb-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="p-1 text-white rounded text-center border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 hover:border-blue-500 hover:ring-1 hover:ring-blue-500 hover:ring-opacity-50 bg-[#13151a] placeholder:text-white/50"
            placeholder="Link Title"
            value={linkTitle}
            onChange={(e) => setLinkTitle(e.target.value)}
          />
          <input
            type="text"
            className="p-1 text-white rounded text-center border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 hover:border-blue-500 hover:ring-1 hover:ring-blue-500 hover:ring-opacity-50 bg-[#13151a] placeholder:text-white/50"
            placeholder="URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-2 rounded bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none"
          >
            Add Link
          </button>
        </form>
        <div className="max-w-md mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <div
              key={link.id}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-lg font-semibold"
              >
                {link.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LinksPage;
