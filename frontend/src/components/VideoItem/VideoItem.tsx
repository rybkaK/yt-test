import React from 'react';
import {Video} from "../../types/video/video.type.ts";

type Properties = {
  video: Video;
}

const VideoItem: React.FC<Properties> = ({ video }) => {
  return (
      <div
          key={video.videoId}
          className="bg-white rounded-lg shadow p-4 flex items-start gap-4"
      >
        <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-24 h-24 object-cover rounded"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {video.title}
          </h2>
          <p className="text-gray-600 text-sm">{video.description}</p>
        </div>
      </div>
  );
};

export default VideoItem;