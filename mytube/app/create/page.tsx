"use client";

import { useState } from "react";
import { Upload, Image as ImageIcon, Video, CheckCircle } from "lucide-react";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Entertainment");
  const [visibility, setVisibility] = useState("Public");
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = () => {
    if (!title.trim()) {
      alert("Please enter a video title.");
      return;
    }

    setUploaded(true);

    setTimeout(() => {
      setUploaded(false);
      alert("Video uploaded successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-8 py-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Upload Video
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Upload Box */}
          <div className="border-2 border-dashed border-gray-700 rounded-xl p-10 flex flex-col items-center justify-center bg-[#181818]">

            <Video size={70} className="text-red-500 mb-5"/>

            <h2 className="text-xl font-semibold mb-2">
              Drag & Drop your video
            </h2>

            <p className="text-gray-400 mb-6">
              or click below to choose a file
            </p>

            <input
              type="file"
              accept="video/*"
              className="mb-5"
            />

            <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
              <Upload size={18}/>
              Select Video
            </button>

            <div className="mt-8 w-full border-t border-gray-700 pt-6">

              <h3 className="font-semibold mb-3">
                Thumbnail
              </h3>

              <input
                type="file"
                accept="image/*"
              />

              <div className="mt-3 flex items-center gap-2 text-gray-400">
                <ImageIcon size={18}/>
                Optional custom thumbnail
              </div>

            </div>

          </div>

          {/* Details */}
          <div className="space-y-5">

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Video Title
              </label>

              <input
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                className="w-full bg-[#181818] border border-gray-700 rounded-lg p-3 outline-none focus:border-red-500"
                placeholder="Enter title..."
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Description
              </label>

              <textarea
                rows={6}
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                className="w-full bg-[#181818] border border-gray-700 rounded-lg p-3 outline-none focus:border-red-500"
                placeholder="Tell viewers about your video..."
              />
            </div>

            <div>

              <label className="block mb-2 text-sm text-gray-300">
                Category
              </label>

              <select
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                className="w-full bg-[#181818] border border-gray-700 rounded-lg p-3"
              >
                <option>Entertainment</option>
                <option>Gaming</option>
                <option>Education</option>
                <option>Music</option>
                <option>Technology</option>
                <option>Sports</option>
                <option>News</option>
              </select>

            </div>

            <div>

              <label className="block mb-2 text-sm text-gray-300">
                Visibility
              </label>

              <select
                value={visibility}
                onChange={(e)=>setVisibility(e.target.value)}
                className="w-full bg-[#181818] border border-gray-700 rounded-lg p-3"
              >
                <option>Public</option>
                <option>Unlisted</option>
                <option>Private</option>
              </select>

            </div>

            <button
              onClick={handleUpload}
              className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold text-lg"
            >
              Upload Video
            </button>

            {uploaded && (
              <div className="bg-green-600 rounded-lg p-4 flex items-center gap-3 mt-4">
                <CheckCircle/>
                <span>
                  Upload successful! Your video has been published.
                </span>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}