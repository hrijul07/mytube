"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

interface Video {
  _id: string;
  videotitle: string;
  videochanel: string;
  uploader: string;
  views: number;
  Like: number;
}

export default function LikedPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user._id) return;

    const likedVideos = JSON.parse(
      localStorage.getItem(`likedVideos_${user._id}`) || "[]"
    );

    setVideos(likedVideos);
  }, []);

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
            Liked Videos
          </h1>

          {videos.length === 0 ? (
            <div className="bg-zinc-900 rounded-xl p-10 text-center">
              <h2 className="text-2xl font-semibold mb-2">
                No liked videos yet
              </h2>

              <p className="text-gray-400">
                Videos you like will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {videos.map((video) => (
                <Link
                  key={video._id}
                  href={`/watch/${video._id}`}
                  className="block bg-zinc-900 hover:bg-zinc-800 rounded-xl p-5 transition"
                >
                  <h2 className="text-xl font-semibold">
                    {video.videotitle}
                  </h2>

                  <p className="text-gray-400 mt-1">
                    {video.videochanel}
                  </p>

                  <p className="text-gray-500 text-sm mt-2">
                    {video.views} views • {video.Like} likes
                  </p>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}