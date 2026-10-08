"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Bell, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ChannelPage() {
  const params = useParams();
  const channelName = decodeURIComponent(
    (params?.name as string) || "Unknown Creator"
  );

  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const subs = JSON.parse(localStorage.getItem("subscriptions") || "[]");
    setSubscribed(subs.includes(channelName));
  }, [channelName]);

  const toggleSubscription = () => {
    let subs = JSON.parse(localStorage.getItem("subscriptions") || "[]");

    if (subs.includes(channelName)) {
      subs = subs.filter((x: string) => x !== channelName);
      setSubscribed(false);
    } else {
      subs.push(channelName);
      setSubscribed(true);
    }

    localStorage.setItem("subscriptions", JSON.stringify(subs));
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="h-44 w-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-600" />

      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-4xl font-bold">
            {channelName.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold">{channelName}</h1>

            <p className="text-gray-400 mt-1">
              @
              {channelName.replace(/\s+/g, "").toLowerCase()} • 125K subscribers
              • 84 videos
            </p>

            <p className="text-gray-500 mt-3 max-w-2xl">
              Welcome to {channelName}'s MyTube channel.
            </p>
          </div>

          <button
            onClick={toggleSubscription}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              subscribed
                ? "bg-neutral-800 hover:bg-neutral-700"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {subscribed ? (
              <span className="flex items-center gap-2">
                <Bell size={18} />
                Subscribed
              </span>
            ) : (
              "Subscribe"
            )}
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((video) => (
            <Link
              key={video}
              href="/watch"
              className="rounded-xl overflow-hidden hover:scale-[1.02] transition"
            >
              <div className="aspect-video bg-neutral-800" />

              <div className="p-3">
                <h3 className="font-medium">
                  Sample Video {video}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  {channelName}
                </p>

                <p className="text-xs text-gray-500">
                  {video * 17}K views • {video} days ago
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-2 text-green-400">
          <CheckCircle2 size={18} />
          Dynamic channel page working.
        </div>
      </div>
    </main>
  );
}