"use client";

interface ChannelTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  "Videos",
  "Playlists",
  "Community",
  "Channels",
  "About",
];

export default function ChannelTabs({
  activeTab,
  setActiveTab,
}: ChannelTabsProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">

      <div className="flex gap-8 overflow-x-auto">

        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 whitespace-nowrap transition-all border-b-2 ${
              activeTab === tab
                ? "border-red-600 text-red-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-black dark:hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}

      </div>

    </div>
  );
}