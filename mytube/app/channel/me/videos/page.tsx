"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function YourVideosPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <Header
        user={null}
        onToggleSidebar={() =>
          setSidebarCollapsed((prev) => !prev)
        }
      />

      <div className="flex">
        <Sidebar collapsed={sidebarCollapsed} />

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">
            Your Videos
          </h1>

          <div className="bg-zinc-900 rounded-xl p-10 text-center">
            <h2 className="text-2xl font-semibold mb-2">
              No videos uploaded yet
            </h2>

            <p className="text-gray-400 mb-6">
              Upload your first video to start building your channel. Your uploaded videos will appear here.
            </p>

            <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
              Upload Video
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}