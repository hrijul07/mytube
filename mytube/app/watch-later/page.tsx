"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import WatchLaterContent from "@/components/WatchLaterContent";

export default function WatchLaterPage() {
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

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

        <main className="flex-1">
          <WatchLaterContent />
        </main>
      </div>
    </div>
  );
}