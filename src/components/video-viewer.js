import React from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function VideoViewer({ url }) {
  return (
    <ReactPlayer
      url={url}
      controls
      width="100%"
      height="100%"
      config={{ file: { attributes: { crossOrigin: "anonymous" } } }}
    />
  );
}
