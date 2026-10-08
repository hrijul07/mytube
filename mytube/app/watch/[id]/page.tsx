"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Comments from "@/components/Comments";
import Link from "next/dist/client/link";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Video {
  _id: string;
  videotitle: string;
  filename: string;
  filepath: string;
  filetype: string;
  filesize: string;
  videochanel: string;
  uploader: string;
  views: number;
  Like: number;
}

export default function WatchPage() {
  const params = useParams();
  const id = params?.id as string;

  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!id) return;

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const fetchVideo = async () => {
      try {
        const res = await fetch(`${API_URL}/video/${id}`);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        setVideo(data);
        if (user._id) {
          const key = `subscribed_${user._id}_${data.videochanel}`;
          setSubscribed(localStorage.getItem(key) === "true");
        }
      } catch (err) {
        console.error("Failed to load video:", err);
        setVideo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  const handleLike = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user._id) {
        alert("Please login first.");
        return;
      }

      const res = await fetch(`${API_URL}/like/${video?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Like failed");
      }

      setLiked(data.liked);

      if (video) {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const key = `likedVideos_${user._id}`;
        const likedVideos = JSON.parse(localStorage.getItem(key) || "[]");

        if (data.liked) {
          const exists = likedVideos.some((v:any) => v._id === video._id);
          if (!exists) {
            likedVideos.push(video);
          }
        } else {
          const updated = likedVideos.filter((v:any) => v._id !== video._id);
          localStorage.setItem(key, JSON.stringify(updated));
        }

        if (data.liked) {
          localStorage.setItem(key, JSON.stringify(likedVideos));
        }
      }

      setVideo((prev) =>
        prev
          ? {
              ...prev,
              Like: data.liked ? prev.Like + 1 : prev.Like - 1,
            }
          : prev
      );
    } catch (err) {
      console.error(err);
      alert("Unable to like video.");
    }
  };

  const handleSubscribe = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user._id) return alert("Please login first.");
    if (!video) return;
    const key = `subscribed_${user._id}_${video.videochanel}`;
    if (subscribed) { localStorage.removeItem(key); setSubscribed(false); }
    else { localStorage.setItem(key,"true"); setSubscribed(true); }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center">
        Video not found.
      </div>
    );
  }

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

        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-6xl">
            <video
              controls
              className="w-full rounded-xl bg-black shadow-lg"
            >
              <source
                src={`${API_URL}${video.filepath}`}
                type={video.filetype}
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <h1 className="text-3xl font-bold mt-6">
            {video.videotitle}
          </h1>

          <div className="mt-6 max-w-6xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-lg font-semibold">
                  {video.videochanel}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  {video.views} views • {video.Like} likes
                </p>
              </div>

              <button
                onClick={handleSubscribe}
                className={`px-5 py-2 rounded-full font-semibold transition ${
                  subscribed ? "bg-zinc-700 text-white hover:bg-zinc-600" : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {subscribed ? "Subscribed ✓" : "Subscribe"}
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <button
                onClick={handleLike}
                className={`px-4 py-2 rounded-full transition font-medium ${
                  liked
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-zinc-800 text-white hover:bg-zinc-700"
                }`}
              >
                👍 {liked ? "Liked" : "Like"}
              </button>

              <button className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full transition">
                👎 Dislike
              </button>

              <button className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full transition">
                ↗ Share
              </button>

              <button className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full transition">
                ⬇ Download
              </button>
              <Link href="/watch-party">
    <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg">
        🎉 Watch Party
    </button>
</Link>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl mt-6 p-5 max-w-6xl">
            <h2 className="font-semibold mb-2">
              Description
            </h2>

            <p className="text-gray-300">
              Uploaded by {video.uploader}
            </p>

            <p className="text-gray-500 mt-2">
              File Size: {video.filesize}
            </p>
          </div>

          <Comments videoId={video._id} />
        </main>
      </div>
    </div>
  );
}