"use client";
import Nav from "@/components/Nav";
import React, { useState, useCallback, useMemo } from "react";

const FileInput = ({ label, onChange, accept }: any) => (
  <div className="mb-4 text-center">
    <label className="block mb-2 font-semibold">{label}</label>
    <input
      type="file"
      accept={accept}
      onChange={onChange}
      className="px-4 py-2 border rounded w-full"
    />
  </div>
);

const TextInput = ({ label, value, onChange, placeholder }: any) => (
  <div className="mb-4 text-center">
    <label className="block mb-2 font-semibold">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-1 text-white rounded w-full text-center border border-gray-300 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
    />
  </div>
);

const TextArea = ({ label, value, onChange, placeholder }: any) => (
  <div className="mb-4 text-center">
    <label className="block mb-2 font-semibold">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-1 text-white rounded w-full text-center border border-gray-300 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
      rows={4}
    ></textarea>
  </div>
);

const ColorInput = ({ label, value, onChange }: any) => (
  <div className="mb-4 text-center">
    <label className="block mb-2 font-semibold">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Enter hex code (e.g., #RRGGBB)"
      className="p-1 text-white rounded w-full text-center border border-gray-300 bg-[#13151a] placeholder:text-white/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
    />
    <div
      className="mt-2 w-20 h-10 border flex m-auto"
      style={{ borderColor: value }}
    ></div>
  </div>
);

const LinkItem = ({ link, index, handleRemoveLink }: any) => (
  <li className="flex justify-between items-center mb-2">
    <div className="flex items-center">
      {link.image && (
        <img
          src={URL.createObjectURL(link.image)}
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
);

const CustomizePage: React.FC = () => {
  const [background, setBackground] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [borderColor, setBorderColor] = useState<string>("#000000");
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [newLinkTitle, setNewLinkTitle] = useState<string>("");
  const [newLinkUrl, setNewLinkUrl] = useState<string>("");
  const [newLinkImage, setNewLinkImage] = useState<File | null>(null);
  const [links, setLinks] = useState<
    { title: string; url: string; image: File | null }[]
  >([]);

  const handleAddLink = useCallback(() => {
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
  }, [newLinkTitle, newLinkUrl, newLinkImage, links]);

  const handleRemoveLink = useCallback((index: number) => {
    setLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
  }, []);

  const backgroundPreview = useMemo(
    () =>
      background && (
        <img
          src={URL.createObjectURL(background)}
          alt="Background Preview"
          className="mt-2 w-32 h-auto"
        />
      ),
    [background]
  );

  const avatarPreview = useMemo(
    () =>
      avatar && (
        <img
          src={URL.createObjectURL(avatar)}
          alt="Avatar Preview"
          className="mt-2 w-32 h-auto"
        />
      ),
    [avatar]
  );

  return (
    <section>
      <Nav />
      <div className="container mx-auto p-8 max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          Customize Your Profile
        </h1>
        <FileInput
          label="Background"
          onChange={(e: any) =>
            setBackground(e.target.files ? e.target.files[0] : null)
          }
          accept="image/*"
        />
        {backgroundPreview}
        <FileInput
          label="Avatar"
          onChange={(e: any) =>
            setAvatar(e.target.files ? e.target.files[0] : null)
          }
          accept="image/*"
        />
        {avatarPreview}
        <ColorInput
          label="Card Border Color"
          value={borderColor}
          onChange={(e: any) => setBorderColor(e.target.value)}
        />
        <TextInput
          label="Name"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <TextArea
          label="Bio"
          value={bio}
          onChange={(e: any) => setBio(e.target.value)}
          placeholder="Enter your bio"
        />
        <div className="mb-4 text-center">
          <label className="block mb-2 font-semibold">Links</label>
          <div className="flex flex-col items-center w-full gap-2">
            <TextInput
              value={newLinkTitle}
              onChange={(e: any) => setNewLinkTitle(e.target.value)}
              placeholder="Enter link title"
            />
            <TextInput
              value={newLinkUrl}
              onChange={(e: any) => setNewLinkUrl(e.target.value)}
              placeholder="Enter link URL"
            />
            <FileInput
              label=""
              onChange={(e: any) =>
                setNewLinkImage(e.target.files ? e.target.files[0] : null)
              }
              accept="image/*"
            />
            <button
              onClick={handleAddLink}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none w-full md:w-2/3"
            >
              Add
            </button>
          </div>
          <ul className="mt-2">
            {links.map((link, index) => (
              <LinkItem
                key={index}
                link={link}
                index={index}
                handleRemoveLink={handleRemoveLink}
              />
            ))}
          </ul>
        </div>
        <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none flex m-auto">
          Save Changes
        </button>
      </div>
    </section>
  );
};

export default CustomizePage;
