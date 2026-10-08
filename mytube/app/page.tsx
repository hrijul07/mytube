"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CategoryTab from "@/components/category_tab";
import TrendingPanel from "@/components/TrendingPanel";
import Videogrid from "@/components/Videogrid";
import { VideoCardData } from "@/components/videocard";
import { useUser } from "../lib/AuthContext";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Home() {
  const { user } = useUser();

  const [videos, setVideos] = useState<VideoCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${API_URL}/video/getall`);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          console.warn("Unexpected API response:", data);
          setVideos([]);
        }
      } catch (err) {
        console.error("Failed to load videos:", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Placeholder until category filtering is implemented
  const filteredVideos =
    category === "All"
      ? videos
      : videos.filter(() => false);

  return (
    <div
      className="
        min-h-screen
        bg-white text-gray-900
        dark:bg-[#0F0F0F] dark:text-[#F1F1F1]
      "
    >
      <Header
        user={user}
        onToggleSidebar={() =>
          setSidebarCollapsed((prev) => !prev)
        }
      />

      <div className="flex">
        <Sidebar collapsed={sidebarCollapsed} />

        <main
          className="
            flex-1 min-w-0
            bg-white dark:bg-[#0F0F0F]
          "
        >
          <CategoryTab
            active={category}
            onChange={setCategory}
          />

          <TrendingPanel />

          <div className="px-4 py-6">
            <h2
              className="
                text-xl font-semibold mb-4
                text-gray-900
                dark:text-white
              "
            >
              Shorts
            </h2>

            <div
              className="
                rounded-xl
                border border-gray-200
                bg-gray-50
                p-8
                text-center
                text-gray-500

                dark:border-[#272727]
                dark:bg-[#181818]
                dark:text-[#AAAAAA]
              "
            >
              Shorts section coming soon.
            </div>
          </div>

          <Videogrid
            videos={filteredVideos}
            loading={loading}
          />
        </main>
      </div>
    </div>
  );
}