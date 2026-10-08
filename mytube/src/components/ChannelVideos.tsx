import VideoCard, { VideoCardData } from "./videocard";

interface ChannelVideosProps {
  videos: VideoCardData[];
}

export default function ChannelVideos({
  videos,
}: ChannelVideosProps) {
  if (!videos || videos.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600">
          No videos uploaded yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">
        Videos
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
          />
        ))}
      </div>
    </div>
  );
}