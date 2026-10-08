import { TrendingUp } from "lucide-react";

export interface TrendingItem {
  rank: number;
  title: string;
  channel: string;
  views: string;
  color: string;
}

const DEFAULT_TRENDING: TrendingItem[] = [
  {
    rank: 1,
    title: "Watch Me Build a $1M Business in 2025",
    channel: "MYTUBER 1 ",
    views: "24K",
    color: "#3B4252",
  },
  {
    rank: 2,
    title: "How I Built a $500K Business",
    channel: "MYTUBER 2",
    views: "892K",
    color: "#4C2A2A",
  },
  {
    rank: 3,
    title: "Tokyo Street Food Tour 2025",
    channel: "MYTUBER 3 ",
    views: "3.1M",
    color: "#2A3B2A",
  },
];

interface TrendingPanelProps {
  items?: TrendingItem[];
}

export default function TrendingPanel({
  items = DEFAULT_TRENDING,
}: TrendingPanelProps) {
  return (
    <div className="mx-4 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-[#272727] dark:bg-[#181818]">
      <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3 dark:border-[#272727]">
        <TrendingUp className="h-4 w-4 text-[#E8352B]" />

        <span className="text-sm font-medium text-gray-900 dark:text-[#F1F1F1]">
          Trending on MyTube
        </span>
      </div>

      {items.length === 0 ? (
        <div className="py-8 text-center text-sm text-gray-500 dark:text-[#AAAAAA]">
          No trending videos available.
        </div>
      ) : (
        <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-3 md:divide-x md:divide-y-0 dark:divide-[#272727]">
          {items.map((item) => (
            <div
              key={item.rank}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-[#242424]"
            >
              <span className="w-6 shrink-0 text-2xl font-semibold text-gray-400 dark:text-[#5A5A5A]">
                {item.rank}
              </span>

              <div
                className="h-9 w-14 shrink-0 rounded"
                style={{ backgroundColor: item.color }}
              />

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-[#F1F1F1]">
                  {item.title}
                </p>

                <p className="truncate text-xs text-gray-500 dark:text-[#AAAAAA]">
                  {item.channel} · {item.views} views
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}