import Link from "next/link";
import { Play, Lock } from "lucide-react";
import { formatViews, timeAgo } from "../lib/format";

export interface VideoCardData {
  _id: string;
  videotitle: string;
  videochanel: string;
  uploader?: string;
  views: number;
  Like: number;
  createdAt: string;
  isPremium?: boolean;
}

function placeholderGradient(id: string) {
  let hash = 0;

  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;

  return `linear-gradient(135deg, hsl(${hue} 30% 16%), hsl(${(hue + 40) % 360} 25% 9%))`;
}

export default function VideoCard({
  video,
}: {
  video: VideoCardData;
}) {
  return (
    <Link
      href={`/watch/${video._id}`}
      className="group flex flex-col gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8352B] rounded-lg"
    >
      <div
        className="relative aspect-video w-full overflow-hidden rounded-xl"
        style={{ background: placeholderGradient(video._id) }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity">
          <Play className="w-10 h-10 text-white" fill="white" />
        </div>

        {video.isPremium && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-[#F1C232]">
            <Lock className="w-3 h-3" />
            Gold
          </div>
        )}

        <div className="absolute bottom-0 left-0 h-[3px] w-full bg-black/10 dark:bg-white/10 overflow-hidden">
          <div className="h-full w-0 bg-[#E8352B] transition-all duration-500 ease-out group-hover:w-full" />
        </div>
      </div>

      <div className="flex gap-3">
        <div
          className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-xs font-medium text-white"
          style={{ background: "#E8352B" }}
        >
          {video.videochanel?.[0]?.toUpperCase() || "?"}
        </div>

        <div className="min-w-0">
          <h3 className="text-gray-900 dark:text-[#F1F1F1] text-sm font-medium leading-snug line-clamp-2">
            {video.videotitle}
          </h3>

          <p className="text-gray-600 dark:text-[#AAAAAA] text-sm mt-1 truncate">
            {video.videochanel}
          </p>

          <p className="text-gray-500 dark:text-[#AAAAAA] text-xs mt-0.5 font-mono">
            {formatViews(video.views)} · {timeAgo(video.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}