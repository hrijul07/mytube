"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function ChannelPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

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
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-zinc-700 flex items-center justify-center text-3xl font-bold">
              {(user.name || "M")[0].toUpperCase()}
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                {user.name || "My Channel"}
              </h1>

              <p className="text-gray-400 mt-2">
                0 Subscribers • 0 Videos
              </p>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl p-10 text-center">
            <h2 className="text-2xl font-semibold mb-2">
              No videos uploaded yet
            </h2>

            <p className="text-gray-400">
              Upload your first video to start growing your channel.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}