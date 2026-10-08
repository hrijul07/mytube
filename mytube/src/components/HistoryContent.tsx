"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import VideoCard, { VideoCardData } from "./videocard";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function HistoryContent() {
  const [history, setHistory] = useState<VideoCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/history`,
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        }
      );

      setHistory(res.data || []);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Unable to load watch history."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    try {
      await axios.delete(
        `${API_URL}/history`,
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        }
      );

      setHistory([]);
    } catch {
      alert("Failed to clear history.");
    }
  };

  const hasVideos = useMemo(
    () => history.length > 0,
    [history]
  );
    return (
    <div className="w-full p-6">

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-3xl font-bold">
          Watch History
        </h1>

        {hasVideos && (
          <button
            onClick={clearHistory}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
          >
            Clear History
          </button>
        )}

      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <p className="text-gray-500 text-lg">
            Loading history...
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
            📺
          </div>

          <h2 className="text-2xl font-semibold mb-2">
            No watch history
          </h2>

          <p className="text-gray-500 text-center max-w-md">
            Videos you watch will appear here so you can
            quickly find them again.
          </p>

        </div>
      )}

      {!loading && hasVideos && (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

         {history.map((video) => (

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