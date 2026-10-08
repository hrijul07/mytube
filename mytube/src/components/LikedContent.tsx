 "use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import VideoCard, { VideoCardData } from "./videocard";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LikedContent() {
  const [likedVideos, setLikedVideos] = useState<VideoCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  useEffect(() => {
    fetchLikedVideos();
  }, []);

  const fetchLikedVideos = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/liked`,
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        }
      );

      setLikedVideos(res.data || []);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Unable to load liked videos."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearLikedVideos = async () => {
    try {
      await axios.delete(
        `${API_URL}/liked`,
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        }
      );

      setLikedVideos([]);
    } catch {
      alert("Failed to clear liked videos.");
    }
  };

  const hasVideos = useMemo(
    () => likedVideos.length > 0,
    [likedVideos]
  );
    return (
    <div className="w-full p-6">

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-3xl font-bold">
          Liked Videos
        </h1>

        {hasVideos && (
          <button
            onClick={clearLikedVideos}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
          >
            Clear Likes
          </button>
        )}

      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <p className="text-gray-500 text-lg">
            Loading liked videos...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-red-300 bg-red-50 text-red-600 p-4">
          {error}
        </div>
      )}

      {!loading && !error && !hasVideos && (
        <div className="flex flex-col items-center justify-center py-24">

          <div className="text-7xl mb-4">
            ❤️
          </div>

          <h2 className="text-2xl font-semibold mb-2">
            No liked videos
          </h2>

          <p className="text-gray-500 text-center max-w-md">
            Videos you like will appear here for quick access.
          </p>

        </div>
      )}

      {!loading && hasVideos && (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {likedVideos.map((video) => (

            <VideoCard
              key={video._id}
              video={video}
            />

          ))}

        </div>

      )}

    </div>
  );
}