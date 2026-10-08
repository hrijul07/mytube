"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function PlaylistPage() {
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
            Playlists
          </h1>

          <div className="bg-zinc-900 rounded-xl p-10 text-center">
            <h2 className="text-2xl font-semibold mb-2">
              No playlists created yet
            </h2>

            <p className="text-gray-400">
              Create your first playlist to organize your favorite videos.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}