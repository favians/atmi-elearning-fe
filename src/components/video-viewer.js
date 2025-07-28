import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function VideoViewer({ url, onFinishWatched }) {
  const hasReportedRef = useRef(false); // Prevent multiple triggers
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleProgress = (progress) => {
    setPlayedSeconds(progress.playedSeconds);

    if (
      !hasReportedRef.current &&
      duration > 0 &&
      progress.playedSeconds / duration >= 0.9
    ) {
      hasReportedRef.current = true;
      onFinishWatched?.(); // Call prop function
    }
  };

  const handleDuration = (durationInSeconds) => {
    setDuration(durationInSeconds);
  };

  return (
    <ReactPlayer
      url={url}
      controls
      width="100%"
      height="100%"
      onProgress={handleProgress}
      onDuration={handleDuration}
      config={{ file: { attributes: { crossOrigin: "anonymous" } } }}
    />
  );
}
