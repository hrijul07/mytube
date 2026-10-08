import Link from "next/link";
import { Zap, Play } from "lucide-react";
import { formatViews } from "../lib/format";

export interface ShortItem {
  id: string;
  title: string;
  views: number;
  color: string;
}

const DEFAULT_SHORTS: ShortItem[] = [
  {
    id: "s1",
    title: "POV: Midnight walk in Seoul",
    views: 14_000_000,
    color: "#1a2a3a",
  },
  {
    id: "s2",
    title: "Satisfying food prep",
    views: 8_200_000,
    color: "#2a2a2a",
  },
  {
    id: "s3",
    title: "Optical illusion that broke my brain",
    views: 22_000_000,
    color: "#1a2a2a",
  },
  {
    id: "s4",
    title: "Cats vs cucumbers: the director's cut",
    views: 51_000_000,
    color: "#1a3a2a",
  },
  {
    id: "s5",
    title: "5 life hacks you needed yesterday",
    views: 9_700_000,
    color: "#2a2620",
  },
  {
    id: "s6",
    title: "Starry night timelapse",
    views: 31_000_000,
    color: "#241a3a",
  },
];

export default function ShortsRow({
  shorts = DEFAULT_SHORTS,
}: {
  shorts?: ShortItem[];
}) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between px-4 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-[#E8352B] flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" fill="white" />
          </span>

          <span className="text-base font-semibold text-gray-900 dark:text-[#F1F1F1]">
            Shorts
          </span>
        </div>

        <Link
          href="/shorts"
          className="text-sm text-gray-500 hover:text-gray-900 dark:text-[#AAAAAA] dark:hover:text-[#F1F1F1] flex items-center gap-1"
        >
          See all
        </Link>
      </div>

      <div
        className="flex gap-3 overflow-x-auto px-4 pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {shorts.map((s) => (
          <Link
            key={s.id}
            href={`/shorts/${s.id}`}
            className="group shrink-0 w-[180px] rounded-xl overflow-hidden relative"
            style={{
              aspectRatio: "9/16",
              background: s.color,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity">
              <Play className="w-8 h-8 text-white" fill="white" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-sm font-medium line-clamp-2">
                {s.title}
              </p>

              <p className="text-white/70 text-xs mt-1 font-mono">
                {formatViews(s.views)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}