"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import VideoCard, { VideoCardData } from "./videocard";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface SearchResultProps {
  query: string;
}

export default function SearchResult({
  query,
}: SearchResultProps) {
  const [videos, setVideos] = useState<VideoCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setVideos([]);
      return;
    }

    searchVideos();
  }, [query]);

  const searchVideos = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${API_URL}/search`,
        {
          params: {
            q: query,
          },
        }
      );

      setVideos(res.data || []);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Search failed."
      );
    } finally {
      setLoading(false);
    }
  };
    return (
    <div className="w-full p-6">

      <h1 className="text-3xl font-bold mb-8">
        Search Results
      </h1>

      {!query.trim() && (
        <div className="flex items-center justify-center py-24">
          <p className="text-gray-500 text-lg">
            Start typing to search videos.
          </p>
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-24">
          <p className="text-gray-500 text-lg">
            Searching...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        query.trim() &&
        videos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">

            <div className="text-7xl mb-4">
              🔍
            </div>

            <h2 className="text-2xl font-semibold mb-2">
              No results found
            </h2>

            <p className="text-gray-500 text-center">
              Try searching with different keywords.
            </p>

          </div>
        )}

      {!loading && videos.length > 0 && (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {videos.map((video) => (

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