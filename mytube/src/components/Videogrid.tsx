import VideoCard, { VideoCardData } from "./videocard";

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      <div className="aspect-video w-full rounded-xl bg-gray-200 dark:bg-[#272727]" />

      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-[#272727] shrink-0" />

        <div className="flex-1 space-y-2 py-1">
          <div className="h-3 bg-gray-200 dark:bg-[#272727] rounded w-4/5" />
          <div className="h-3 bg-gray-200 dark:bg-[#272727] rounded w-2/5" />
        </div>
      </div>
    </div>
  );
}

export default function Videogrid({
  videos,
  loading,
}: {
  videos: VideoCardData[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!videos.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-4">
        <p className="text-gray-900 dark:text-[#F1F1F1] text-lg font-medium">
          Nothing here yet
        </p>

        <p className="text-gray-500 dark:text-[#AAAAAA] text-sm mt-1">
          Upload the first video or check back once creators start posting.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 p-4">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}