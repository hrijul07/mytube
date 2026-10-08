"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function SubscriptionsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [channels, setChannels] = useState<string[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user._id) return;

    const subscribedChannels: string[] = [];

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(`subscribed_${user._id}_`)) {
        const value = localStorage.getItem(key);

        if (value === "true") {
          subscribedChannels.push(
            key.replace(`subscribed_${user._id}_`, "")
          );
        }
      }
    });

    setChannels(subscribedChannels);
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
            Subscriptions
          </h1>

          {channels.length === 0 ? (
            <div className="bg-zinc-900 rounded-xl p-10 text-center">
              <h2 className="text-2xl font-semibold mb-2">
                No subscriptions yet
              </h2>

              <p className="text-gray-400">
                Channels you subscribe to will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {channels.map((channel, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 rounded-xl p-5"
                >
                  <h2 className="text-xl font-semibold">
                    {channel}
                  </h2>

                  <p className="text-gray-400">
                    Subscribed ✓
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}