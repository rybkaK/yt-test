import React from 'react';
import { Video } from "../../types/video/video.type.ts";
import VideoItem from "../VideoItem/VideoItem.tsx";

type Properties = {
  videos: Video[]
}

const VideosList: React.FC<Properties> = ({ videos }) => {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {videos.length > 0 ? (
            videos.map((video) => (
                <VideoItem video={video} />
            ))
        ) : (
            <p className="text-gray-600 text-center col-span-2">
              No videos found.
            </p>
        )}
      </div>
  );
};

export default VideosList;