import { useEffect, useState } from "react";
// Core viewer
import { Viewer } from "@react-pdf-viewer/core";

// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

export const PDFViewer = ({ url }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
  }, []);
  return (
    <div
      style={{
        height: "450px",
      }}
    >
      <Viewer
        fileUrl={url}
        plugins={[
          // Register plugins
          defaultLayoutPluginInstance,
        ]}
      />
    </div>
  );
};
